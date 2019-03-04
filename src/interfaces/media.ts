export interface IPic {
  file_id: number;
  filename: string;
  filesize: number;
  title: string;
  description: string;
  user_id: number;
  media_type: 'image' | 'video' | 'audio';
  mime_type: string;
  time_added: string;
  screenshot: string;
  thumbnails: IThumbnails;
}

export interface IThumbnails {
  w160: string;
  w320?: string;
  w640?: string;
}

export interface IUser {
  user_id?: number;
  username: string;
  password?: string;
  email?: string;
  full_name?: string;
  time_created?: string;
}

export interface ILoginResponse {
  message: string;
  token: string;
  user: IUser;
}

export interface IUsernameAvailableResponse {
  username: string;
  available: boolean;
}
