import express from "express";
import {
  updateUserValidator,
  updateUserRoleValidator,
  setUserStatusValidator,
} from "../validators/user.valitadors.js";
import UserController from "../controllers/user.controller.js";
import {
  authMiddleware,
  isAdmin,
  validationMiddleware,
} from "../middlewares/index.js";

const router = express.Router();

router.patch(
  "/:id/block",
  authMiddleware,
  isAdmin,
  setUserStatusValidator,
  validationMiddleware,
  UserController.blockUser
);

router.patch(
  "/:id/unblock",
  authMiddleware,
  isAdmin,
  setUserStatusValidator,
  validationMiddleware,
  UserController.unblockUser
);

router.patch(
  "/",
  authMiddleware,
  updateUserValidator,
  validationMiddleware,
  UserController.updateUser
);

router.patch(
  "/role",
  authMiddleware,
  updateUserRoleValidator,
  validationMiddleware,
  UserController.setUserRole
);

router.get("/", authMiddleware, isAdmin, UserController.getUsers);

export default router;
