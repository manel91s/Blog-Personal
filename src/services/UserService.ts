import User from '../models/User';
import Mailer from './Mailer';
import { IUser, infoMailer } from '../types/types';
import { generateId } from '../utils/generator';

class UserService {
  private user : IUser | any;

  private mailer;

  constructor() {
    this.mailer = new Mailer();
  }

  public register(userDTO : IUser) {
    const user = new User(userDTO);
    user.token = generateId();
    return user.save();
  }

  public generateToken(user: IUser) {
    user.confirm = false;
    user.token = generateId();
    // eslint-disable-next-line no-return-await
    return user.save();
  }

  public update(user: IUser) {
    return user.save();
    
  }

  public updateToken(token: string) {
    const update = {
      confirm: true,
      token: '',
    };
    return User.findOneAndUpdate({ token }, update);
  }

  public getUser(email: string) {
    return User.findOne({ email });
  }

  public verify(token: string) {
    return User.findOne({ token });
  }

  public sendToken(data: infoMailer) {
    this.mailer.sendToken(data);
  }

  public async checkPassword(email:string, password: string) {
    this.user = await User.findOne({ email });

    return this.user?.checkPassword(password);
  }
}

export default UserService;
