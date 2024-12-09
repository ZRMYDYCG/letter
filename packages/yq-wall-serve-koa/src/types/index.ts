export interface IUser {
  username: string;
  password: string;
  nickname: string;
  avatar: string;
  identity: number;
}

export interface IUserQueryResult {
  users?: IUser[];
  total?: number;
  user?: IUser;
}
