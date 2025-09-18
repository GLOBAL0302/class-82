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
}




export interface ITrackHistory{
  user:IUser,
  track:ITrack,
  played_at:Date
}

export interface IUser{
  _id:string
  username:string,
  token:string,
}

export interface IUserMutation{
  username: string;
  password: string;
}

