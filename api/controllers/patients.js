///Create patient

const Patient = require("../models/patient");
const { validateEmail, scheduleEmail } = require("./shared");


async function createPatient(patientData,res){

   try {
      let patient = new Patient({ //TODO names
         fName:  patientData["First Name"],
         lName: patientData[" Last Name"],
         state: patientData[" State"],
         zip: patientData[" Zip"],
         email: patientData[" email"],
         consent: patientData[" Consent"],
         phone: patientData[" Phone Number"],
         mobile: patientData[" Mobile Phone"],
         date: patientData[" Date Of Birth"],
      })
      let newPatient = await patient.save();
      if(validateEmail(newPatient.email)){
         scheduleEmail(newPatient.email,newPatient._id,res);
      } 

   } catch (error) {
      console.log("Error Creating Patient")
      console.log(error)
      res.send({msg:"Error Ocurred creating patient", err: error}) 
   }
  
}

module.exports={
   createPatient
}
