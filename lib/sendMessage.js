"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const nodemailer_1 = require("nodemailer");
// @ts-ignore see https://github.com/microsoft/TypeScript/issues/33079
const corsAsync_1 = require("mk-firebase-functions-utils/corsAsync");
const corsAsync = (0, corsAsync_1.corsAsync)({ origin: true });
const sendMail = async (options) => {
    const transporter = (0, nodemailer_1.createTransport)(options.mailTransport);
    await transporter.sendMail(options.mailOptions);
};
const sendMessage = async (req, res, options) => {
    await corsAsync(req, res);
    if (JSON.stringify(req.body).length > options.maxMessageSize) {
        return res.status(400).send('Message is too big.');
    }
    try {
        await sendMail(options);
        res.status(200).end();
    }
    catch (error) {
        res.status(500).send('Error while sending contact form message.');
        throw error;
    }
};
exports.sendMessage = sendMessage;
