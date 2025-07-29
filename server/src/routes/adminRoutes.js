import express from "express";
import { GetAllContacts } from "../controllers/adminController.js";
import { isAdmin, Protect } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.get("/contacts", Protect, isAdmin, GetAllContacts);

export default router;