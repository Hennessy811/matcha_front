import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";

@Injectable({
  providedIn: "root"
})
export class GeolocationService {
  constructor(private http: HttpClient,
              private user: UserService) {
  }

  private byGPS() {
    return new Promise(((resolve, reject) => {
      if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition((position) => {
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          resolve({longitude: longitude, latitude: latitude})
        }, (err) => reject(err.message));
      } else {
        reject("No support for geolocation")
      }
    }))
  }

  private byIP() {
    var xmlhttp = new XMLHttpRequest();
    var ip_address = '194.186.207.248';
    var auth = '2e8de3b5-4635-40e9-8b27-2a3bb30cbb1d';
    var url = "https://ipfind.co/?auth=" + auth + "&ip=" + ip_address;

    return this.http.get(url)
  }

  setPosition() {
    this.byGPS()
      .then((res: {longitude: number, latitude: number}) => {
        this.user.setMe({
          location: {
            coordinates: [res.longitude, res.latitude],
            type: 'Point'
          }
        })
      })
      .catch(err => {
        this.byIP()
          .subscribe((res: any) => {
            this.user.setMe({
              location: {
                coordinates: [res.longitude, res.latitude],
                type: 'Point'
              }
            })
          });
      });
  }
}
