import { Request, Response } from 'firebase-functions';
import { SendMailOptions } from 'nodemailer';
export interface SendMessageOptions {
    mailOptions: {
        to: SendMailOptions['to'];
        replyTo: SendMailOptions['replyTo'];
        subject: string;
        html: string;
    };
    mailTransport: {
        auth: {
            pass: string;
            user: string;
        };
        service: string;
    };
    maxMessageSize: number;
}
export declare const sendMessage: (req: Request, res: Response, options: SendMessageOptions) => Promise<Response<any> | void>;
