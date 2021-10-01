const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const { createEmail } = require('./email');


function emailGenerator (option, patientEmail, scheduleDate, patientId){
  console.log("Generating Email")
  try {
      let fromEmail = "example@mail.com" //TODO change with your email
      let mailSubject = ""
      let mailText = ""
      let name = ""
      let transporterGmail = nodemailer.createTransport({
        // TODO change this with your info
        service: 'gmail',
        auth: {
          user: 'your-email@gmail.com',
          pass: 'your-gmail-password'
        }
      });

      switch (option) {
        case 1:
          name="DAY1"
          mailSubject="1st mail"
          mailText="Hey welcome..."
          break;
        case 2:
          name="DAY2"
          mailSubject="2nd mail"
          mailText="Friendly reminder..."
          break;
        case 3:
          name="DAY3"
          mailSubject="3rd mail"
          mailText="Dont forget to use your coupons..."
          break;
        case 4:
          name="DAY4"
          mailSubject="4th mail"
          mailText="Are you ready to comeback? ..."
          break;
        default:
            name=""
            mailSubject=""
            mailText=""
          break;
      }
      if (name===mailSubject===mailText) {
        throw "Incorrect option to creat MailOptions"
      }
      let mailOptions = {
        from:fromEmail,
        to: patientEmail,
        subject:mailSubject,
        text:mailText
      }
      transporterGmail.sendMail(mailOptions, function(error, info){
        if (error) {
          throw {msg:"Error sending Email", err: error}
        } else {
          console.log('Email sent: ' + info.response);
          createEmail({
            from: fromEmail,
            to: patientEmail,
            content: mailText,
            recieverReference: patientId,
            name: name,
            schedule_date: scheduleDate
          })
        }
      });
  } catch (error) {
    console.log("Error sending email");
    console.log(error);
  }
}

function scheduleEmail (patientEmail,patientId, res){
    console.log("Schedule Email")
    const currentDate = new Date();
    let scheduleDate = currentDate;
    
    scheduleDate.setDate(scheduleDate.getDate()+1)
    const job = schedule.scheduleJob(scheduleDate, function(){
       emailGenerator(1,patientEmail,scheduleDate,patientId);
    });
    scheduleDate.setDate(scheduleDate.getDate()+1)
    const job1 = schedule.scheduleJob(scheduleDate, function(){
      emailGenerator(2,patientEmail,scheduleDate,patientId);
    });
    scheduleDate.setDate(scheduleDate.getDate()+1)
    const job2 = schedule.scheduleJob(scheduleDate, function(){
      emailGenerator(3,patientEmail,scheduleDate,patientId);
    });
    scheduleDate.setDate(scheduleDate.getDate()+1)
    const job3 = schedule.scheduleJob(scheduleDate, function(){
      emailGenerator(4,patientEmail,scheduleDate,patientId);
    });
    res.send("Patient created and scheduled emails")
    job.emit("run", ()=>{console.log("EMAIL sended")});
    job1.emit("run", ()=>{console.log("EMAIL sended")});
    job2.emit("run", ()=>{console.log("EMAIL sended")});
    job3.emit("run", ()=>{console.log("EMAIL sended")});

}
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


module.exports = {
    emailGenerator,
    scheduleEmail,
    validateEmail
}