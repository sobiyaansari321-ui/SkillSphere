import express from 'express'
import { 
    createProject,  
    getProjects , 
    getMyProjects , 
    updateProject ,
    deleteProject ,
    getProjectById ,
    searchProjects 
} from '../controllers/projectController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router();

router.post("/", protect , createProject );
router.get("/", getProjects);
router.get("/search", searchProjects);
router.get("/my-projects", protect , getMyProjects);
router.put("/:id", protect , updateProject);
router.delete("/:id", protect , deleteProject);
router.get("/:id",getProjectById )

export default router;