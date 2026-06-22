import express from "express";
import { signup , login, getProfile, updateProfile , searchUser , getAllUsers , getUserById} from '../controllers/userController.js'
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup );
router.post("/login", login);
router.get("/search", searchUser);
router.get("/profile", protect , getProfile);
router.put("/profile", protect , updateProfile);
router.get("/:id",getUserById)
router.get("/", getAllUsers);

export default router