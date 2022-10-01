import { Request, Response } from 'firebase-functions';
import { SendMailOptions } from 'nodemailer';
export interface SendMessageOptions {
    mailOptions: {
        from?: SendMailOptions['from'];
        to: SendMailOptions['to'];
        replyTo?: SendMailOptions['replyTo'];
        subject: string;
        html: string;
    };
    mailTransport: any;
    maxMessageSize: number;
}
export declare const sendMessage: (req: Request, res: Response, options: SendMessageOptions) => Promise<Response<any> | void>;
