export interface User {
  email: string,
  password: string,
  username?: string,
  password_confirmation?: string,
  fname?: string,
  lname?: string,
  age?: number,
  biography?: string,
  gender?: "male" | "female" | "transgender",
  preferences?: "female" | "male" | "bisexual",
  interests?: string[],
  location?: {
    type?: "Point",
    coordinates?: number[]
  }
}
