import express from "express";
//import userAuth from "../middleware/authMiddleware";
import {
  getUserController,
  updateUserController,
} from "../controller/userController.js";
import userAuth from "../middleware/authMiddleware.js";

const router = express.Router();

// get users
router.get("/get-user", userAuth, getUserController);

//Update users
router.put("/update-user", userAuth, updateUserController);
export default router;
