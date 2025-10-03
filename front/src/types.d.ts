export interface IArtist {
  _id: string;
  title: string;
  image: string;
  description: string;
  isPublished: boolean;
}

export interface IArtistMutation {
  title: string;
  image: File | null;
  description: string;
}

export interface IAlbum {
  _id: string;
  title: string;
  artist: IArtist;
  create_at: Date;
  image: string;
  isPublished: boolean;
}

export interface IAlbumMutation {
  title: string;
  artist: string;
  create_at: string;
  image: File | null;
  isPublished: string;
}
export interface ITrack {
  _id: string;
  title: string;
  album: IAlbum;
  track_number: number;
  url: string;
  isPublished: boolean;
}

export interface ITrackHistory {
  _id: string;
  user: IUser;
  track: ITrack;
  played_at: Date;
}

export interface IUser {
  _id: string;
  username: string;
  token: string;
  role: string;
}

export interface ISigninMutation {
  username: string;
  password: string;
}

export interface ILoginMutation {
  username: string;
  password: string;
}

export interface RegisterResponse {
  user: IUser;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface IGlobalError {
  error: string;
}
