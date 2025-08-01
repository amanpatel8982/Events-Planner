import express from "express";
import { GetAllContacts, UpdateContacts } from "../controllers/adminController.js";
import { isAdmin, Protect } from "../middlewares/authmiddleware.js";
 
const router = express.Router();

 router.get("/contacts", Protect, isAdmin, GetAllContacts);
 console.log("tfcvgbhnjm");
 router.put("/contacts/:Qid", Protect, isAdmin, UpdateContacts);

export default router;