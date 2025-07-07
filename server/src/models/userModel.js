import mongoose from "mongoose";

const userSchema = mongoose.Schema({
   fullName:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
},

{timestamps:true}

);

const User = mongoose.model("User",userSchema); // create table in monogoDB name of tables is (Users/plural form) because more user data store in table  

export default User;