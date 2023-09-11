import express from "express";
import userController from "../controller/user-controller";
import { authMiddleware } from "../middleware/auth-middleware";

const userRouter = new express.Router();
userRouter.use(authMiddleware);
userRouter.get('/api/users', userController.get);

export {
  userRouter
}