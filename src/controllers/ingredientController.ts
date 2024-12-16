import { Request, Response } from "express";
import { pool } from "../data/config";
import { Ingredient } from "../models/ingredient";

export const ingredientController = {
    getAll: async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await pool.query("SELECT * FROM ingredient");
            if (result.rows.length === 0) {
                res.status(404).json({ error: "Aucun ingrédient trouvé." });
                return;
            }
            res.status(200).json({ ingredients: result.rows });
        } catch (error) {
            console.error("Erreur lors de la récupération des ingrédients.", error);
            res.status(500).json({ error: "Erreur interne du serveur." });
        }
    },

    getById: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const result = await pool.query("SELECT * FROM ingredient WHERE id = $1", [id]);

            if (result.rows.length === 0) {
                res.status(404).json({ error: `L'ingrédient avec l'ID ${id} est introuvable` });
                return;
            }

            res.status(200).json({ ingredient: result.rows[0] });
        } catch (error) {
            console.error(`Erreur lors de la récupération de l'ingrédient ${id}.`, error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    },

    create: async (req: Request, res: Response): Promise<void> => {
        const { name }: Ingredient = req.body;

        // Vérification des données nécessaires
        if (!name) {
            res.status(400).json({ error: "Le nom de l'ingrédient est requis." });
            return;
        }

        try {
            // Insertion dans la base de données
            const result = await pool.query(
                `INSERT INTO ingredient (name)
                VALUES ($1) RETURNING *`,
                [name]
            );

            // Retourne l'ingrédient créé avec son ID
            res.status(201).json({ ingredient: result.rows[0] });
        } catch (error) {
            console.error("Erreur lors de la création de l'ingrédient.", error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    },

    update: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { name }: Ingredient = req.body;

        if (!name) {
            res.status(400).json({ error: "Le nom de l'ingrédient est requis." });
            return;
        }

        try {
            // Vérification si l'ingrédient existe
            const ingredientExists = await pool.query("SELECT * FROM ingredient WHERE id = $1", [id]);
            if (ingredientExists.rows.length === 0) {
                res.status(404).json({ error: `L'ingrédient avec l'id ${id} est introuvable.` });
                return;
            }

            // Mise à jour de l'ingrédient
            const result = await pool.query(
                `UPDATE ingredient
                SET name = $1
                WHERE id = $2
                RETURNING *`,
                [name, id]
            );

            res.status(200).json({ ingredient: result.rows[0] });
        } catch (error) {
            console.error(`Erreur lors de la mise à jour de l'ingrédient ${id}.`, error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    },

    delete: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            // Vérification si l'ingrédient existe
            const ingredientExists = await pool.query("SELECT * FROM ingredient WHERE id = $1", [id]);
            if (ingredientExists.rows.length === 0) {
                res.status(404).json({ error: `L'ingrédient avec l'ID ${id} est introuvable.` });
                return;
            }

            // Suppression de l'ingrédient
            await pool.query("DELETE FROM ingredient WHERE id = $1", [id]);

            res.status(200).json({ message: `L'ingrédient avec l'ID ${id} supprimé avec succès.` });
        } catch (error) {
            console.error(`Erreur lors de la suppression de l'ingrédient ${id}.`, error);
            res.status(500).json({ error: "Erreur interne du serveur." });
        }
    },
};
