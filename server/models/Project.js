import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {

        title:{
            type:String,
            required:true,
        },

        description:{
            type:String,
            required:true,
        },

        requiredSkills:{
            type:[String],
            default:[],
        },

        // kis user ne create kiya 
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },

        // enum- status jo h bs given values me se hi hoga (open or in progress or completed)
        status:{
            type:String,
            enum:["Open","In Progress","Completed"], 
            default:"Open",
        },

        collaborators:[
            {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    ],

    },

    {
        timestamps:true,
    }

);

const Project = mongoose.model("Project",projectSchema);

export default Project