import express from 'express'
import {
    sendMessage ,
    getMessages
} from '../controllers/messageController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

// send msg
router.post("/", authMiddleware , sendMessage)

// get msgs of a project
router.get("/:projectId", authMiddleware , getMessages )

export default router