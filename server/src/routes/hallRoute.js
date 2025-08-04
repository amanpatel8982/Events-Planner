import express from "express";
import { Protect , isAdmin } from "../middlewares/authMiddleware.js";
import {AddHall , getHall} from "../controllers/hallController.js" 



const router = express();

router.post("/add", Protect , isAdmin , AddHall  )
router.get("/hall", Protect, isAdmin , getHall )


export default router;