/**
 * @author Leon Mwandiringa
 * @uses define Enmailer service
 * @return emailer instance
 */

import * as Mailer from "nodemailer";
import Config from "../../../Bootstrap/Config";

const emailer = Mailer.createTransport({
    host: 'in-v3.mailjet.com',
        port: Config.SMTP_RELAY.mailjet.port,
        secure: Config.SMTP_RELAY.mailjet.secure, 
        auth: {
            user: Config.SMTP_RELAY.mailjet.username,
            pass: Config.SMTP_RELAY.mailjet.password
        }
});

//
class EmailerService{

    private sendTo: string;
    private emailSubject: string;
    private emailMessage: string;
    //injkecting incoming params
    constructor({email, subject, message }: any){

        this.sendTo = email;
        this.emailSubject = subject;
        this.emailMessage = message;

    }

    //sending user an email
   public send(){

        let mailOptions = {
            from: Config.SMTP_RELAY.mailjet.from,
            to: this.sendTo,
            subject: this.emailSubject,
            text: this.emailMessage
        };

        emailer.sendMail(mailOptions, function(error: any, info: any){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });

        return;

    }

}

export default EmailerService;