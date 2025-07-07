import express from "express";
import { Register,Login,Logout,Update} from "../controllers/authcontroller.js";



const router = express.Router();

router.post("/register",Register);
router.post("/login",Login);
router.get("/logout",Logout);
router.put("/update",Update)



export default router;
