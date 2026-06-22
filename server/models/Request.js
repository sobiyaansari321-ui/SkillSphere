import mongoose from 'mongoose'

const requestSchema = new mongoose.Schema (
    {

        projectId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Project",
            required:true,
        },

        senderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },

        recieverId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },

        status:{
            type:String,
            enum:["Pending","Accepted","Rejected"],
            default:"Pending",
        },
    },

    {
        timestamps:true,
    }

);

const Request = mongoose.model("Request", requestSchema);

export default Request;