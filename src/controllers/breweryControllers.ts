import { Request, Response } from "express";
import { pool } from "../data/config";
import { Brewery } from "../models/brewery";

export const breweryController = {
    getAll: async (req: Request, res: Response): Promise<void> => {
        try {
            // Requête SQL avec une jointure pour récupérer les bières associées à chaque brasserie
            const result = await pool.query(`
                SELECT 
                    b.id,
                    b.name,
                    b.address,
                    b.country,
                    b.description,
                    b.schedules,
                    b.url_social_media,
                    json_agg(
                        json_build_object(
                            'id', beer.id,
                            'name', beer.name,
                            'type', beer.type,
                            'alcool_pourcent', beer.alcool_pourcent
                        )
                    ) AS beers
                FROM brewery b
                LEFT JOIN beer beer ON b.id = beer.brewery_id
                GROUP BY b.id
                ORDER BY b.id ASC
            `);
    
            if (result.rows.length === 0) {
                res.status(404).json({ error: "Aucune brasserie trouvée." });
                return;
            }
    
            // Retourner les résultats avec les bières incluses pour chaque brasserie
            res.status(200).json(result.rows);
        } catch (error) {
            console.error("Erreur lors de la récupération des brasseries.", error);
            res.status(500).json({ error: "Erreur lors de la récupération des brasseries." });
        }
    },
    

    getById: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            // Récupération des détails de la brasserie
            const breweryResult = await pool.query("SELECT * FROM brewery WHERE id = $1", [id]);
    
            if (breweryResult.rows.length === 0) {
                res.status(404).json({ error: `Brasserie avec l'ID ${id} introuvable` });
                return;
            }
    
            const brewery = breweryResult.rows[0];
    
            // Récupération des bières associées
            const beersResult = await pool.query("SELECT * FROM beer WHERE brewery_id = $1", [id]);
            const beers = beersResult.rows.map((beer: any) => ({
                id: beer.id,
                name: beer.name,
                type: beer.type,
                alcool_pourcent: beer.alcool_pourcent,
                brewery: {
                    id: brewery.id,
                    name: brewery.name,
                    address: brewery.address,
                    country: brewery.country,
                    description: brewery.description,
                    schedules: brewery.schedules,
                    url_social_media: brewery.url_social_media
                },
                details_beer: {} // Vous pouvez remplir cet objet selon la structure de vos détails de bière
            }));
    
            // Retourner les détails de la brasserie et les bières associées
            res.status(200).json({
                id: brewery.id,
                name: brewery.name,
                address: brewery.address,
                country: brewery.country,
                description: brewery.description,
                schedules: brewery.schedules,
                url_social_media: brewery.url_social_media,
                beers: beers
            });
        } catch (error) {
            console.error(`Erreur lors de la récupération de la brasserie ${id}.`, error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    },    
    
    create: async (req: Request, res: Response): Promise<void> => {
        const { name, address, country, description, schedules, url_social_media }: Brewery = req.body;
    
        // Vérification des données nécessaires
        if (!name || !address || !country || !description || !schedules || !url_social_media) {
            res.status(400).json({ error: "Tous les champs sont requis." });
            return;
        }
    
        try {
            // Requête SQL pour insérer une nouvelle brasserie
            const result = await pool.query(
                `INSERT INTO brewery (name, address, country, description, schedules, url_social_media)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *`, 
                [name, address, country, description, schedules, url_social_media]
            );
    
            // Retourner la brasserie créée avec son id généré
            res.status(201).json({ brewery: result.rows[0] });
        } catch (error) {
            console.error("Erreur lors de la création de la brasserie.", error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    },

    update: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { name, address, country, description, schedules, url_social_media }: Partial<Brewery> = req.body;
    
        try {
            // Vérification si la brasserie existe
            const breweryExists = await pool.query("SELECT * FROM brewery WHERE id = $1", [id]);
            if (breweryExists.rows.length === 0) {
                res.status(404).json({ error: `Brasserie avec l'ID ${id} introuvable` });
                return;
            }
    
            // Mise à jour de la brasserie
            const result = await pool.query(
                `UPDATE brewery 
                SET 
                    name = COALESCE($1, name), 
                    address = COALESCE($2, address), 
                    country = COALESCE($3, country), 
                    description = COALESCE($4, description), 
                    schedules = COALESCE($5, schedules), 
                    url_social_media = COALESCE($6, url_social_media)
                WHERE id = $7
                RETURNING *`,
                [name, address, country, description, schedules, url_social_media, id]
            );
    
            res.status(200).json({ brewery: result.rows[0] });
        } catch (error) {
            console.error(`Erreur lors de la mise à jour de la brasserie ${id}.`, error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    },
    
    delete: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
    
        try {
            // Vérification si la brasserie existe
            const breweryExists = await pool.query("SELECT * FROM brewery WHERE id = $1", [id]);
            if (breweryExists.rows.length === 0) {
                res.status(404).json({ error: `Brasserie avec l'ID ${id} introuvable.` });
                return;
            }
    
            // Suppression de la brasserie
            await pool.query("DELETE FROM brewery WHERE id = $1", [id]);
    
            res.status(200).json({ message: `Brasserie avec l'ID ${id} supprimée avec succès.` });
        } catch (error) {
            console.error(`Erreur lors de la suppression de la brasserie ${id}.`, error);
            res.status(500).json({ error: "Erreur interne du serveur." });
        }
    },
    
    // deleteAll: async (req: Request, res: Response): Promise<void> => {
    //     try {
    //         // Suppression de toutes les brasseries
    //         await pool.query("DELETE * FROM brewery");
    
    //         res.status(200).json({ message: "Toutes les brasseries ont été supprimées avec succès." });
    //     } catch (error) {
    //         console.error("Erreur lors de la suppression de toutes les brasseries.", error);
    //         res.status(500).json({ error: "Erreur interne du serveur." });
    //     }
    // }    
}