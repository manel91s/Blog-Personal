import User from '../models/User';
import Mailer from '../models/Mailer';
import { IUser, infoMailer } from '../types/types';
import generateId from '../utils/generator';

export default class UserService {
  private userRecord! : IUser | any;

  private mailer;

  constructor() {
    this.mailer = new Mailer();
  }

  async register(userDTO : IUser) {
    this.userRecord = new User(userDTO);

    this.userRecord.token = generateId();

    await this.userRecord.save();

    return { user: this.userRecord };
  }

  async updateToken(token: string) {
    const update = {
      confirm: true,
      token: '',
    };
    await User.findOneAndUpdate({ token }, update);
  }

  async sendToken(data: infoMailer) {
    this.mailer.sendToken(data);
  }
}
