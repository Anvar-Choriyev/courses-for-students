const nodemailer = require('nodemailer');

  exports.sendVerificationMail = ({to, subject, html}) => {
    const transporter = nodemailer.createTransport({
      service:"gmail",
      auth:{
       user:"choriyevanvar08@gmail.com",
       pass:"hikfwisgdvfwucsx"
      }
      }
    )
  const options={
    from: "choriyevanvar08@gmail.com",
    to,
    subject,
    html
  }
  
  transporter.sendMail(options,(err,info)=>{
    if(err){
      console.log(err);
      return
    }
    console.log("email sent")
  })
  }