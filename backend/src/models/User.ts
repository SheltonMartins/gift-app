export interface User {
  id?: number;
  name: string;
  email: string;
  password_hash: string;
  profile_picture?: string;
  bio?: string;
}