import express from "express";
import { GetProfile ,UpdateProfile} from "../controllers/userController.js";
import { isAdmin, Protect } from "../middlewares/authMiddleware.js";
import multer from 'multer'; 
import { deleteUser } from "../controllers/authcontroller.js";



const upload = multer();

const router = express.Router();

router.get("/profile", Protect, GetProfile );
router.put("/deactivate",Protect, deleteUser)
router.put("/update", Protect,upload.single("picture"), UpdateProfile);

export default router;