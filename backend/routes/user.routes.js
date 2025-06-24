import express from "express";
import { editProfile, getCurrentUser, getOtherUsers, search } from "../controllers/user.controllers.js";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurrentUser);            // ✅ Token-protected current user
userRouter.get("/others", isAuth, getOtherUsers);              // ✅ Token-protected list of other users
userRouter.put("/profile", isAuth, upload.single("image"), editProfile); // ✅ Token + multer + profile update
userRouter.get("/search", isAuth, search);                     // ✅ Token-protected user search

export default userRouter;
