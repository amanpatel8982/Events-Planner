import express from "express";
import { Register,Login, LogoutUser} from "../controllers/authcontroller.js";



const router = express.Router();

router.post("/register",Register);
router.post("/login",Login);
router.get("/logout",LogoutUser);
// router.put("/update",Update)



export default router;
