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
