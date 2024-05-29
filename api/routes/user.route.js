import express from "express";
import { test, updateUser } from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js"; // verify token: check the token is valid or not for updating user

const router = express.Router();

router.get('/', test);
router.post("/update/:id", verifyToken, updateUser);

export default router;