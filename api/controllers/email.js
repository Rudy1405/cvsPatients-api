//create Email

const Email = require("../models/email")


async function createEmail(emailData){
    try {
        let email = new Email({
            from: "example@mail.com", //TODO change with your email
            to: emailData.to,
            content: emailData.content,
            recieverReference: emailData.recieverReference,
            name: emailData.name,
            schedule_date: emailData.schedule_date
        })
        await email.save();
        console.log("Email Created and send it")
    } catch (error) {
        console.log("ERROR ADDING EMAIL TO DB")
        console.log(error)
    }
}


/*
const emailSchema = new Schema({
    from: {type:String, require: true},
    to: {type:String, require: true},
    content: {type:String, require: true},
    recieverReference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patients"
    }
}, {
    time
*/
module.exports ={
    createEmail
}