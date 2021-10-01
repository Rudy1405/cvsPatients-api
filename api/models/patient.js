const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    fName:{type:String, require:true},
    lName:{type:String, require:true},
    state:{type:String, require:true},
    zip:{type:Number, require:true},
    email:{type:String, require:true},
    consent:{type:String, require:true},
    phone:{type:Number, require:true},
    mobile:{type:Number, require:true},
    date:{type:String, require:true}
}, {
    timestamps: true
});

module.exports = mongoose.model("Patient", patientSchema);
