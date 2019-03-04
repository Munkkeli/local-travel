export interface Pic {
  file_id: number;
  user_id: number;
  filename: string;
  filesize: number;
  title: string;
  description: string;
  media_type: string;
  mime_type: string;
  time_added: string;
  screenshot?: string;
  thumbnails?: Thumbnail;
}

export interface Thumbnail {
  w160: string;
  w320: string;
  w640: string;
}

export interface Login {
  message: string;
  token: string;
  user: User;
}

export interface User {
  user_id: number;
  username: string;
  email: string;
  time_created: string;
  full_name?: string;
  avatar?: string;
}

export interface UserExists {
  username: string;
  available: boolean;
}

export interface UserCreated {
  message: string;
  user_id: number;
}
