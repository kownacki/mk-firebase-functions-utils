import {Request, Response} from 'firebase-functions';
import {createTransport, SendMailOptions} from 'nodemailer';
import {corsAsync as corsAsyncLib} from './corsAsync';
const corsAsync = corsAsyncLib({origin: true});

export interface SendMessageOptions {
  mailOptions: {
    to: SendMailOptions['to'],
    replyTo: SendMailOptions['replyTo'],
    subject: string,
    html: string,
  },
  mailTransport: {
    auth: {
      pass: string,
      user: string,
    },
    service: string,
  }
  maxMessageSize: number,
}

const sendMail = async (options: SendMessageOptions) => {
  const transporter = createTransport(options.mailTransport);
  await transporter.sendMail({
    to: options.mailOptions.to,
    replyTo: options.mailOptions.replyTo,
    subject: options.mailOptions.subject,
    html: options.mailOptions.html,
  });
};

export const sendMessage = async (req: Request, res: Response, options: SendMessageOptions): Promise<Response<any> | void> => {
  await corsAsync(req, res);
  if (JSON.stringify(req.body).length > options.maxMessageSize) {
    return res.status(400).send('Message is too big.');
  }
  try {
    await sendMail(options);
    res.status(200).end();
  } catch (error) {
    res.status(500).send('Error while sending contact form message.');
    throw error;
  }
};
