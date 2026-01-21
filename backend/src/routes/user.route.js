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
  UserController.blockUser,
);

router.patch(
  "/:id/unblock",
  authMiddleware,
  isAdmin,
  setUserStatusValidator,
  validationMiddleware,
  UserController.unblockUser,
);

router.patch(
  "/",
  authMiddleware,
  updateUserValidator,
  validationMiddleware,
  UserController.updateUser,
);

router.patch(
  "/role",
  authMiddleware,
  isAdmin,
  updateUserRoleValidator,
  validationMiddleware,
  UserController.setUserRole,
);

router.get("/", authMiddleware, isAdmin, UserController.getUsers);

export default router;

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lista de usuários
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários obtidos com sucesso!
 *       400:
 *         description: Um ou mais dados fornecidos estão incorretos
 *       401:
 *         description: Credenciais inválidas ou Token inválido
 *       403:
 *         description: Sem permissão de admin
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Atualiza um usuário
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso!
 *       400:
 *         description: Um ou mais dados fornecidos está incorretos
 *       401:
 *         description: Usuário sem autorização ou Token inválido
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/users/{id}/block:
 *   patch:
 *     summary: Bloqueia um usuário
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário bloqueado com sucesso!
 *       400:
 *         description: Um ou mais dados fornecidos está incorretos
 *       401:
 *         description: Usuário sem autorização ou Token inválido
 *       403:
 *         description: Sem permissão de admin
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/users/{id}/unblock:
 *   patch:
 *     summary: Desbloqueia um usuário
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário desbloqueado com sucesso!
 *       400:
 *         description: Um ou mais dados fornecidos está incorretos
 *       401:
 *         description: Usuário sem autorização ou Token inválido
 *       403:
 *         description: Sem permissão de admin
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/users/role:
 *   patch:
 *     summary: Atualiza o papel de um usuário
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - role
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "123"
 *               role:
 *                 type: string
 *                 example: admin
 *     responses:
 *       200:
 *         description: Papel do usuário atualizado com sucesso!
 *       400:
 *         description: Um ou mais dados fornecidos está incorretos
 *       401:
 *         description: Usuário sem autorização ou Token inválido
 *       403:
 *         description: Sem permissão de admin
 *       500:
 *         description: Erro interno do servidor
 */
