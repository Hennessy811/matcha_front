export interface User {
  id?: string | number;
  email?: string;
  password?: string;
  blocklist?: User[];
  fame_rating?: number;
  username?: string;
  connected?: boolean;
  password_confirmation?: string;
  fname?: string;
  lname?: string;
  age?: number;
  biography?: string;
  is_active?: boolean;
  last_seen?: any;
  // gender?: 'male' | 'female' | 'transgender';
  gender?: 'male' | 'female';
  preferences?: 'female' | 'male' | 'bisexual';
  interests?: string[];
  photos?: Photo[];
  subscribers?: User[];
  subscriptions?: User[];
  location?: {
    type?: 'Point',
    coordinates?: number[]
  };
  viewers?: {id: number | string, username: string}[];
}

export interface Photo {
  id: string | number;
  is_main: boolean;
  url: string;
}
