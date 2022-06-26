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

  public async register(userDTO : IUser) {
    const user = new User(userDTO);

    user.token = generateId();

    this.user = await this.user.save();

    return this.user;
  }

  public async generateToken() {
    this.user.confirm = false;
    this.user.token = generateId();
    // eslint-disable-next-line no-return-await
    return await this.user.save();
  }

  public async update(user: IUser) {
    this.user = await user.update();
  }

  public async updateToken(token: string) {
    const update = {
      confirm: true,
      token: '',
    };
    // Si el user no está en memoria buscamos y actualizamos
    if (!this.user) {
      return await User.findOneAndUpdate({ token }, update);
    }

    this.user = update.confirm;
    this.user = update.token;

    await this.user.save();
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
    this.user = await User.findOne({ email });

    return this.user?.checkPassword(password);
  }
}

export default UserService;
