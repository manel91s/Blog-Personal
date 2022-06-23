import User from '../models/User';
import Mailer from '../models/Mailer';
import { IUser, infoMailer } from '../types/types';
import { generateId } from '../utils/generator';

class UserService {
  private userRecord! : IUser | any;

  private mailer;

  constructor() {
    this.mailer = new Mailer();
  }

  async register(userDTO : IUser) {
    this.userRecord = new User(userDTO);

    this.userRecord.token = generateId();

    const user = await this.userRecord.save();

    return { user };
  }

  async updateToken(token: string) {
    const update = {
      confirm: true,
      token: '',
    };
    await User.findOneAndUpdate({ token }, update);
  }

  async getUser(email: string) {
    const user = await User.findOne({ email });

    return user;
  }

  async sendToken(data: infoMailer) {
    this.mailer.sendToken(data);
  }

  async checkPassword(email:string, password: string) {
    const userRegistered = await User.findOne({ email });

    return userRegistered?.checkPassword(password);
  }
}

export default UserService;
