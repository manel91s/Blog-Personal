import User from '../models/User';
import Mailer from './Mailer';
import { IUser, infoMailer } from '../types/types';
import { generateId } from '../utils/generator';

class UserService {
  private userRecord! : IUser | any;

  private user : IUser | any;

  private mailer;

  constructor() {
    this.mailer = new Mailer();
  }

  public async register(userDTO : IUser) {
    this.userRecord = new User(userDTO);

    this.userRecord.token = generateId();

    const user = await this.userRecord.save();

    return { user };
  }

  public async generateToken() {
    this.user.confirm = false;
    this.user.token = generateId();
    // eslint-disable-next-line no-return-await
    return await this.user.save();
  }

  public async update(user: IUser) {
    user.save();
  }

  public async updateToken(token: string) {
    const update = {
      confirm: true,
      token: '',
    };
    // Actualizamos si user no está en memoria
    if (!this.user) {
      return await User.findOneAndUpdate({ token }, update);
    }

    this.user.confirm = update.confirm;
    this.user.token = update.token;
    this.user.update();
  }

  public async getUser(email: string) {
    this.user = await User.findOne({ email });

    return this.user;
  }

  public async verify(token: string) {
    this.user = await User.findOne({ token });

    return this.user;
  }

  public async sendToken(data: infoMailer) {
    this.mailer.sendToken(data);
  }

  public async checkPassword(email:string, password: string) {
    const userRegistered = await User.findOne({ email });

    return userRegistered?.checkPassword(password);
  }
}

export default UserService;
