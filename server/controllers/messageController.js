import Message from "../models/Message.js";
import Project from "../models/Project.js";

// Send Message
export const sendMessage = async (req, res) => {
  try {
    const { projectId , text } = req.body

    const project = await Project.findById(projectId)

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      })
    }

    const message = await Message.create({
      project: projectId,
      sender: req.user.id,
      text,
    })

    res.status(201).json(message)

  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// Get All Messages of a Project
export const getMessages = async (req, res) => {
  try {
    const { projectId } = req.params

    const messages = await Message.find({
      project: projectId,
    })
      .populate("sender", "name email")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};