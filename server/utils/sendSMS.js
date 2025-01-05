// import twilio from "twilio"
// import config from "config"

// let sid = config.get("TWILIO_SID");
// let token = config.get("TWILIO_TOKEN");
// let phone = config.get("TWILIO_NUMBER");

// async function sendSMS(smsData){
//     try {
//         let client = new twilio(sid,token);
//         await client.messages.create(
//             {
//                 from:phone,
//                 to:smsData.to,
//                 body:smsData.body
//             }
//         );
//         console.log("SMS Sent!");
//     } catch (error) {
//         console.log(error);
//     }
// }

// export default sendSMS