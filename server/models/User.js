import mongoose from "mongoose";

const userSchema = new mongoose.Schema (
    {

    name:{
        type:String,
        required:true
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

    bio:{
        type:String,
        default:"",
    },

    skills:{
        type:[String],
        default:[],
    },

    github:{
        type:String,
        default:"",
    },

    linkedin:{
        type:String,
        default:"",
    },

    },

    {
        timestamps:true,
    }
);

const User = mongoose.model("User",userSchema);

export default User;