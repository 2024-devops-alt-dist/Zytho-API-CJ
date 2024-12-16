import { Router } from "express";
import { usersController } from "../controllers/usersController";
export const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer toutes les users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Liste des users récupérée avec succès.
 */
router.get("/", usersController.getAll);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Récupérer un user par son ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la users
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User trouvé.
 *       404:
 *         description: User introuvable.
 */
router.get('/:id', usersController.getById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Ajouter un nouvel utilisateur
 *     description: ⚠️ le mot de passe doit faire au moins 8 caractères.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - firstname
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User ajouté avec succès.
 */
router.post("/", usersController.create);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur par son ID
 *     description: ⚠️ le mot de passe doit faire au moins 8 caractères.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'utilisateur à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès.
 *       400:
 *         description: Données invalides.
 *       404:
 *         description: Utilisateur introuvable.
 */
router.put("/:id", usersController.update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur par son ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès.
 *       404:
 *         description: Utilisateur non trouvé.
 */
router.delete("/:id", usersController.delete);

export default router;