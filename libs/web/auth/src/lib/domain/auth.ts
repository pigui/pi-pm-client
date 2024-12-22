import { User } from './user';

export class Auth {
  constructor(
    public user: User,
    public accessToken: string,
    public refreshToken: string
  ) {}
}
