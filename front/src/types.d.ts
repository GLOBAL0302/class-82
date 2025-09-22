export interface IArtist {
  _id: string;
  title: string;
  image: string;
  description: string;
}

export interface IAlbum {
  _id: string;
  title: string;
  artist: IArtist;
  create_at: Date;
  image: string;
}
export interface ITrack {
  _id: string;
  title: string;
  album: IAlbum;
  track_number: number;
  url: string;
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
