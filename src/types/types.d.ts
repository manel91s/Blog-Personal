import { Express } from 'express';

export interface infoMailer {
    email: string;
    confirmURL: string;
}

export interface IUser {
    mailer: any;
    save();
    checkPassword(password: string);
    name: string;
    surname: string;
    email: string;
    password:string;
    avatar?:string;
    token: string;
    confirm: boolean;
    private: boolean;
    id_rol: number;

}

export interface IPost {
    title: string,
    body: string,
    slug: string,
    public: boolean,
    id_user: number,
    id_category: number
}
