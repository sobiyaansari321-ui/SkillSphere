import Project from "../models/Project.js";

export const createProject = async ( req,res ) => {

    try{
        const {title , description , requiredSkills} = req.body ;

        const project = await Project.create({
            title,
            description,
            requiredSkills,
            createdBy:req.user.id,
        });

        res.status(201).json({
            message:"Project created successfully !", project
        });

    }

    catch (error) {
        res.status(500).json({
            message:error.message
        })

    }
}


export const getProjects = async ( req,res ) => {

    try{
        const projects = await Project.find().populate( "createdBy" , "name email" );

        res.status(200).json(projects);
    }

    catch (error) {
        res.status(500).json({
            message:error.message,
        });
    }

}


export const getMyProjects = async ( req,res ) => {

    try{
        const projects = await Project.find({
            createdBy:req.user.id,
        }).populate("collaborators","name email")
        // upr ka Project.find({...}) ka mtlb ye h k db se sirf wo projects hi lao jo createdBy current logged in user h
        // like mne sirf 5 projects bnaye h but ksi or ne 10 to muje mre 5 hi dikhege

        res.status(200).json(projects);
    }

    catch (error) {
        res.status(500).json({
            message:error.message,
        });
    }

}


export const updateProject = async ( req,res ) => {

    try {
        const { title , description , requiredSkills , status } = req.body ;

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message:"Project not found !"
            });
        }

        // ownership check 
        if (project.createdBy.toString()!==req.user.id) {
            return res.status(401).json({
                message:"Not Authoirized !"
            });
        }

        project.title = title || project.title ;
        project.description = description || project.description ;
        project.requiredSkills = requiredSkills || project.requiredSkills ;
        project.status = status || project.status ;

        const updatedProject = await project.save();

        res.status(200).json({
            message:"Project updated successfully !",
            project:updatedProject,
        });

    }

    catch (error) {
        res.status(500).json({
            message:error.message,
        });
    }

}


export const deleteProject = async ( req,res ) => {
     try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message:"Project not found !",
            });
        }

        // owner check 
        if (project.createdBy.toString()!==req.user.id) {
            return res.status(401).json({
                message:"Not Authoirized !",
            });
        }

        await project.deleteOne();

        res.status(200).json({
            message:"Project deleted successfully !"
        });

     }

     catch (error) {
        res.status(500).json({
            message:error.message,
        });
     }

}


export const getProjectById = async ( req,res ) => {

    try {
        const project = await Project.findById(req.params.id)
        .populate("createdBy","name email")
        .populate("collaborators","name email");

        if (!project) {
            return res.status(404).json({
                message:"Project not found !"
            })
        }

        res.status(200).json(project)

    }

    catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}


export const searchProjects = async ( req,res ) => {

    try {
        const { skill } = req.query

        // $options:"i" - isse case insensitive hojayga
        // $regex - flexible matching (like mne search kiya "rea" to neeche react suggest krega)
        const projects = await Project.find({
            requiredSkills:{
                $regex:skill,
                $options:"i",
            }
        });

        res.status(200).json(projects)
    }

    catch (error) {
        res.status(500).json({
            message:error.message
        });
    }

}