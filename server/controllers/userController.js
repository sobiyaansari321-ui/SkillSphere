import bcrypt from 'bcryptjs'
import User from "../models/User.js";
import jwt from 'jsonwebtoken';

export const signup = async ( req,res ) => {

    try{
        const { name , email , password } = req.body ;

        const existingUser = await User.findOne({email});

        if ( existingUser) {
            return res.status(400).json({
                message:"This user already exists."
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = await User.create({
            name,
            email,
            password:hashedPassword,
        });

        res.status(201).json({
            message:"User registered successfully.",user,
        });

    }

    catch (error) {
        res.status(500).json({
            message:error.message,
        });

    }
}

export const login = async ( req,res ) =>{

    try{
        const { email , password } = req.body ;

        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({
                message:"Invalid email or password !"
            });
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if (!isMatch) {
            return res.status(400).json({
                message:"Invalid email or password !"
            });
        }

        const token = jwt.sign(
            {id:user.id},
            process.env.JWT_SECRET,
            { expiresIn:"7d"}
        );

        res.status(200).json({
            message:"Login Successful !", token , user
        });
    }
    catch(error) {
        res.status(500).json({
            message:error.message
        });
    }

}

export const getProfile = async ( req,res ) => {

    try{
        res.status(201).json({
            message:"Protected Profile Route",
            user:req.user,
        });
    }

    catch (error) {
        res.status(500).json({
            message:error.message,
        })
    }
}

export const updateProfile = async ( req,res ) => {

    try{
        const { name , bio , skills , github , linkedin } = req.body ;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message:"User not found !",
            });
        }

        // new value ayi ho like name ki , to name update krdo or na ayi ho to old rhne do
        user.name = name || user.name;
        user.bio = bio || user.bio;
        user.skills = skills || user.skills;
        user.github = github || user.github;
        user.linkedin = linkedin || user.linkedin;

        const updatedUser = await user.save();

        res.status(200).json({
            message:"Profile updated successfully !",
            user:updatedUser,
        });
    }

    catch(error){
        res.status(500).json({
            message:error.message
        });
    }

}

export const searchUser = async ( req,res ) => {

    try {
        const { skill } = req.query

        const users = await User.find({
            skills:{
                $in:[new RegExp(skill,"i")],
            },
        }).select("-password");

        res.status(200).json(users)
    }

    catch (error) {
        res.status(500).json({
            message:error.message,
        });
    }
}

export const getAllUsers = async ( req,res ) => {
    try{
        const users = await User.find()

        res.status(200).json(users)
    }
    catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

export const getUserById = async ( req,res ) => {
    try {
        const user = await User.findById(req.params.id).select("-password")

        if (!user) {
            return res.status(404).json({
                message:"User not found !"
            })
        }

        res.status(200).json(user)
    }

    catch (error) {
        res.status(500).json({
            message:error.message,
        })
    }
}