const AppError = require("./appError")

exports.sendVerificationSMS = async ({to, verCode, next}) => {
    console.log(to, verCode,);
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require("twilio")
    (accountSid, authToken);
    return(message = client.messages.create({
        from: "+19288523676",
        body: verCode, 
        to: `${to}`
    })).then((message) => console.log(message.sid))
}
