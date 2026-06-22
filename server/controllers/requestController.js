import Request from "../models/Request.js";
import Project from "../models/Project.js";

export const sendRequest = async ( req,res ) => {

    try{
        const project = await Project.findById(req.params.projectId);

        if (!project) {
            return res.status(404).json({
                message:"Project not found !"
            });
        }

        // user apne project pe request na bhej ske 
        if (project.createdBy.toString()===req.user.id) {
            return res.status(400).json({
                message:"You can not request your own project ..."
            });
        }

        const existingRequest =  await Request.findOne({
            projectId:project.id,
            senderId:req.user.id,
        });

        if (existingRequest) {
            return res.status(400).json({
                message:"Request already sent",
            });
        }

        const request = await Request.create({
            projectId:project.id,
            senderId:req.user.id,
            recieverId:project.createdBy,
        });

        res.status(201).json({
            message:"Request sent successfully !",
            request,
        });

    }

    catch (error) {
        res.status(500).json({
            message:error.message,
        });
    }

}

export const getMyRequests = async ( req,res ) => {

    try{
        const requests = await Request.find({
            recieverId:req.user.id,
        })
        .populate("senderId","name email")
        .populate("projectId","title")

        res.status(200).json(requests);
    }

    catch (error) {
        res.status(500).json({
            message:error.message,
        });
    }

}

export const acceptRequest = async ( req,res ) => {

    try{
        const request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                message:"Request not found !"
            })
        }

        if (request.recieverId.toString()!==req.user.id) {
            return res.status(401).json({
                message:"Not authorized !"
            })
        }

        request.status = "Accepted";

        const project = await Project.findById(request.projectId);

        if (!project.collaborators.includes(request.senderId)) {
            project.collaborators.push(request.senderId);
        }

        await project.save();

        await request.save();

        res.status(200).json({
            message:"Request accepted successfully !",
            request
        })

    }

    catch (error) {
        res.status(500).json({
            message:error.message
        })
    }

}

export const rejectRequest = async ( req,res ) => {

    try{
        const request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                message:"Request not found !"
            })
        }

        if (request.recieverId.toString()!==req.user.id) {
            return res.status(401).json({
                message:"Not authorized !"
            })
        }

        request.status = "Rejected";

        await request.save();

        res.status(200).json({
            message:"Request rejected successfully !",
            request
        })
    }

    catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
    
}