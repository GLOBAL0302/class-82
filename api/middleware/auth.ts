import { Request, Response, NextFunction } from 'express';
import { IUserFields } from '../types';
import { User } from '../models/User';

export interface RequestWithUser extends Request {
  user: IUserFields;
}

const auth = async (expressReq: Request, res: Response, next: NextFunction) => {
  const req = expressReq as RequestWithUser;
  const token = req.get('Authorization');

  if (!token) {
    res.status(401).send({ error: 'Token is not provided' });
    return;
  }
  const user = await User.findOne({ token });
  if (!user) {
    return res.status(401).send({ error: 'No Such User' });
  }
  req.user = user;
  next();
};

export default auth;
