import nodemailer from "nodemailer"
import config from "config"

const user= config.get("EMAIL");
const pass = config.get("PASSWORD");

async function sendEmail(emailData){
    try {
        let transporter = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:465,
            secure:true,
            auth:{
                user,
                pass,
            },
        });
        let sending = transporter.sendMail({
            from: `${user}`,
            to: emailData.to,
            subject:emailData.subject,
            text:emailData.text,
            html:emailData.html,
        });
        console.log("Email Sent!");
    } catch (error) {
        console.log(error);
    }
}

export default sendEmail