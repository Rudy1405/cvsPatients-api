const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailSchema = new Schema({
    from: {type:String, require: true},
    to: {type:String, require: true},
    content: {type:String, require: true},
    recieverReference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patients"
    },
    name:String,
    schedule_date:Date
}, {
    timestamps:true
});

module.exports=mongoose.model("Email",emailSchema);