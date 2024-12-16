import { Request, Response } from "express";
import { pool } from "../data/config";
import { Category } from "../models/category";

export const categoryController = {
    getAll: async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await pool.query("SELECT * FROM category");
            if (result.rows.length === 0) {
                res.status(404).json({ error: "Aucunes catégorie trouvée." });
                return; 
            }
            res.status(200).json({ categories: result.rows });
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories.", error);
            res.status(500).json({ error: "Erreur lors de la récupération des catégories." });
        }
    },

    getById: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const result = await pool.query("SELECT * FROM category WHERE id = $1", [id]);

            if (result.rows.length === 0) {
                res.status(404).json({ error: `La catégorie avec l'ID ${id} est introuvable` });
                return;
            }

            res.status(200).json({ category: result.rows[0] });
        } catch (error) {
            console.error(`Erreur lors de la récupération de la catégorie ${id}.`, error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    },

    create: async (req: Request, res: Response): Promise<void> => {
        const { name }: Category = req.body;

        if (!name) {
            res.status(400).json({ error: "Le nom de la catégorie est requis." });
            return;
        }
    
        try {
            // Requête SQL pour insérer une nouvelle catégorie
            const result = await pool.query(
                `INSERT INTO category (name) VALUES ($1) RETURNING *`,
                [name]
            );
    
            // Retourner la catégorie créée avec son id généré
            res.status(201).json({ category: result.rows[0] });
        } catch (error) {
            console.error("Erreur lors de la création de la catégorie.", error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    },

    update: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { name }: Category = req.body;

        try {
            // Vérification si la catégorie existe
            const categoryExists = await pool.query("SELECT * FROM category WHERE id = $1", [id]);
            if (categoryExists.rows.length === 0) {
                res.status(404).json({ error: `La catégorie avec l'ID ${id} est introuvable.` });
                return;
            }

            // Mise à jour de la catégorie
            const result = await pool.query(
                `UPDATE category
                SET name = COALESCE($1, name)
                WHERE id = $2
                RETURNING *`,
                [name, id]
            );

            res.status(200).json({ category: result.rows[0] });
        } catch (error) {
            console.error(`Erreur lors de la mise à jour de la catégorie ${id}.`, error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    },

    delete: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
    
        try {
            // Vérification si la catégorie existe
            const categoryExists = await pool.query("SELECT * FROM category WHERE id = $1", [id]);
            if (categoryExists.rows.length === 0) {
                res.status(404).json({ error: `La catégorie avec l'ID ${id} est introuvable.` });
                return;
            }
    
            // Suppression de la catégorie
            await pool.query("DELETE FROM category WHERE id = $1", [id]);
    
            res.status(200).json({ message: `La catégorie avec l'ID ${id} supprimée avec succès.` });
        } catch (error) {
            console.error(`Erreur lors de la suppression de la catégorie ${id}.`, error);
            res.status(500).json({ error: "Erreur interne du serveur." });
        }
    },
}