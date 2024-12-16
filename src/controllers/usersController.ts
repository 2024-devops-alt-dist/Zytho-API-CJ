import { Request, Response } from "express";
import { pool } from "../data/config";
import { Users } from "../models/users";

export const usersController = {
    getAll: async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await pool.query("SELECT * FROM users");
            if (result.rows.length === 0) {
                res.status(404).json({ error: "Aucun User trouvé." });
                return; 
            }
            res.status(200).json({ users: result.rows });
        } catch (error) {
            console.error("Erreur lors de la récupération des users.", error);
            res.status(500).json({ error: "Erreur lors de la récupération des users." });
        }
    },

    getById: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

            if (result.rows.length === 0) {
                res.status(404).json({ error: `User avec l'ID ${id} introuvable` });
                return;
            }

            res.status(200).json({ user: result.rows[0] });
        } catch (error) {
            console.error(`Erreur lors de la récupération du user ${id}.`, error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    },

    create: async (req: Request, res: Response): Promise<void> => {
        const { firstname, email, password }: Users = req.body;
    
        // Vérification des données nécessaires
        if (!firstname || !email || !password) {
            res.status(400).json({ error: "Tous les champs sont requis." });
            return;
        }
    
        try {
            // Requête SQL correcte pour insérer un nouvel utilisateur
            const result = await pool.query(
                `INSERT INTO users (firstname, email, password)
                VALUES ($1, $2, $3)
                RETURNING *`, 
                [firstname, email, password]
            );
    
            // Retourner le user créée avec son id généré
            res.status(201).json({ user: result.rows[0] });
        } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur.", error);
            res.status(500).json({ error: "description: Données invalides ou mot de passe trop court (au moins 8 caractères)." });
        }
    },

    update: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { firstname, email, password }: Partial<Users> = req.body;

        try {
            // Vérification si le user existe
            const userExists  = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
            if (userExists .rows.length === 0) {
                res.status(404).json({ error: `Utilisateur avec l'id ${id} est introuvable.` });
                return;
            }

            // Validation de l'email : doit être un format valide
            if (email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
                res.status(400).json({ error: "L'email doit être au format valide (ex: example@domain.com)." });
                return;
            }

            // Mise à jour de l'utilisateur
            const result = await pool.query(
                `UPDATE users
                SET 
                    firstname = COALESCE($1, firstname),
                    email = COALESCE($2, email),
                    password = COALESCE($3, password)
                WHERE id = $4
                RETURNING *`,
                [firstname, email, password, id]
            );

            res.status(200).json({ user: result.rows[0] });
        } catch (error) {
            console.error(`Erreur lors de la mise à jour de l'utilisateur ${id}.`, error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    },

    delete: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
    
        try {
            // Vérification si l'utilisateur existe
            const userExists  = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
            if (userExists .rows.length === 0) {
                res.status(404).json({ error: `L'utilisateur avec l'ID ${id} est introuvable.` });
                return;
            }
    
            // Suppression de l'utilisateur
            await pool.query("DELETE FROM users WHERE id = $1", [id]);
    
            res.status(200).json({ message: `L'utilisateur avec l'ID ${id} supprimé avec succès.` });
        } catch (error) {
            console.error(`Erreur lors de la suppression de l'utilisateur ${id}.`, error);
            res.status(500).json({ error: "Erreur interne du serveur." });
        }
    },
};