import mongoose from "mongoose";
const getISTTime = () => {
    const currentDate = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC + 5:30
    const istTime = new Date(currentDate.getTime() + istOffset);
    return istTime;
  };
const Schema = new mongoose.Schema({
email:{
    type:String,
    required:true,
    unique:true
},
name:{
type:String,
required:true,
},
password:{
    type:String,
    required:true,
},
lastlogin:{
    type:Date,
    default:Date.now()
},
resetPasswordToken:String ,
resetTokenExpiresAt:Date,
verificationToken:String,
verificationTokenExpiresAt:Date,
isverified:Boolean
},{
    timestamps: { currentTime: getISTTime } 
});

export const User=mongoose.model('User',Schema)