import { Request, Response } from "express";
import { pool } from "../data/config";
import { Beer } from "../models/beer";

export const beersController = {
    getAll: async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await pool.query(`
                SELECT 
                    b.id AS beer_id,
                    b.name AS beer_name,
                    b.type AS beer_type,
                    b.alcool_pourcent AS beer_alcool_pourcent,
                    db.id AS details_id,
                    db.description AS details_description,
                    db.color AS details_color,
                    db.pays AS details_pays,
                    db.amertume AS details_amertume,
                    db.douceur AS details_douceur,
                    db.fruite AS details_fruite,
                    db.fermentation AS details_fermentation,
                    db.conditionnement AS details_conditionnement,
                    db.contenance AS details_contenance,
                    db.IBU AS details_ibu,
                    db.EBC AS details_ebc,
                    br.id AS brewery_id,
                    br.name AS brewery_name,
                    br.address AS brewery_address,
                    br.country AS brewery_country,
                    br.description AS brewery_description,
                    br.schedules AS brewery_schedules,
                    br.url_social_media AS brewery_social_media
                FROM 
                    Beer b
                JOIN 
                    Details_Beer db ON b.details_beer_id = db.id
                JOIN 
                    Brewery br ON b.brewery_id = br.id;
            `);

            if (result.rows.length === 0) {
                res.status(404).json({ error: "Aucune bière trouvée." });
                return;
            }

            const beers = result.rows.map(row => ({
                id: row.beer_id,
                name: row.beer_name,
                type: row.beer_type,
                alcool_pourcent: row.beer_alcool_pourcent,
                details_beer: {
                    id: row.details_id,
                    description: row.details_description,
                    color: row.details_color,
                    pays: row.details_pays,
                    amertume: row.details_amertume,
                    douceur: row.details_douceur,
                    fruite: row.details_fruite,
                    fermentation: row.details_fermentation,
                    conditionnement: row.details_conditionnement,
                    contenance: row.details_contenance,
                    ibu: row.details_ibu,
                    ebc: row.details_ebc,
                },
                brewery: {
                    id: row.brewery_id,
                    name: row.brewery_name,
                    address: row.brewery_address,
                    country: row.brewery_country,
                    description: row.brewery_description,
                    schedules: row.brewery_schedules,
                    url_social_media: row.brewery_social_media,
                },
            }));

            res.status(200).json(beers);
        } catch (error) {
            console.error("Erreur lors de la récupération des bières.", error);
            res.status(500).json({ error: "Erreur lors de la récupération des bières." });
        }
    },

    getById: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const result = await pool.query(`
                SELECT 
                    b.id AS beer_id,
                    b.name AS beer_name,
                    b.type AS beer_type,
                    b.alcool_pourcent AS beer_alcool_pourcent,
                    db.id AS details_id,
                    db.description AS details_description,
                    db.color AS details_color,
                    db.pays AS details_pays,
                    db.amertume AS details_amertume,
                    db.douceur AS details_douceur,
                    db.fruite AS details_fruite,
                    db.fermentation AS details_fermentation,
                    db.conditionnement AS details_conditionnement,
                    db.contenance AS details_contenance,
                    db.IBU AS details_ibu,
                    db.EBC AS details_ebc,
                    br.id AS brewery_id,
                    br.name AS brewery_name,
                    br.address AS brewery_address,
                    br.country AS brewery_country,
                    br.description AS brewery_description,
                    br.schedules AS brewery_schedules,
                    br.url_social_media AS brewery_social_media
                FROM 
                    Beer b
                JOIN 
                    Details_Beer db ON b.details_beer_id = db.id
                JOIN 
                    Brewery br ON b.brewery_id = br.id
                WHERE 
                    b.id = $1;
            `, [id]);
    
            if (result.rows.length === 0) {
                res.status(404).json({ error: `Bière avec l'ID ${id} introuvable` });
                return;
            }
    
            const beer = result.rows[0];
            const beerData = {
                id: beer.beer_id,
                name: beer.beer_name,
                type: beer.beer_type,
                alcool_pourcent: beer.beer_alcool_pourcent,
                details_beer: {
                    id: beer.details_id,
                    description: beer.details_description,
                    color: beer.details_color,
                    pays: beer.details_pays,
                    amertume: beer.details_amertume,
                    douceur: beer.details_douceur,
                    fruite: beer.details_fruite,
                    fermentation: beer.details_fermentation,
                    conditionnement: beer.details_conditionnement,
                    contenance: beer.details_contenance,
                    ibu: beer.details_ibu,
                    ebc: beer.details_ebc,
                },
                brewery: {
                    id: beer.brewery_id,
                    name: beer.brewery_name,
                    address: beer.brewery_address,
                    country: beer.brewery_country,
                    description: beer.brewery_description,
                    schedules: beer.brewery_schedules,
                    url_social_media: beer.brewery_social_media,
                },
            };
    
            res.status(200).json(beerData);
        } catch (error) {
            console.error(`Erreur lors de la récupération de la bière ${id}.`, error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    },
    

    create: async (req: Request, res: Response): Promise<void> => {
        const { name, type, alcool_pourcent, details_beer_id, brewery_id }: Beer = req.body;
    
        // Vérification des données nécessaires
        if (!name || !type || !alcool_pourcent || !details_beer_id || !brewery_id) {
            res.status(400).json({ error: "Tous les champs sont requis." });
            return;
        }
    
        try {
            // Requête SQL correcte pour insérer une nouvelle bière
            const result = await pool.query(
                `INSERT INTO beer (name, type, alcool_pourcent, details_beer_id, brewery_id)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *`, 
                [name, type, alcool_pourcent, details_beer_id, brewery_id]
            );
    
            // Retourner la bière créée avec son id généré
            res.status(201).json({ beer: result.rows[0] });
        } catch (error) {
            console.error("Erreur lors de la création de la bière.", error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    },

    update: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { name, type, alcool_pourcent, details_beer_id, brewery_id }: Partial<Beer> = req.body;

        try {
            // Vérification si la bière existe
            const beerExists = await pool.query("SELECT * FROM beer WHERE id = $1", [id]);
            if (beerExists.rows.length === 0) {
                res.status(404).json({ error: `Bière avec l'ID ${id} introuvable` });
                return;
            }

            // Mise à jour de la bière
            const result = await pool.query(
                `UPDATE beer 
                SET 
                    name = COALESCE($1, name), 
                    type = COALESCE($2, type), 
                    alcool_pourcent = COALESCE($3, alcool_pourcent), 
                    details_beer_id = COALESCE($4, details_beer_id), 
                    brewery_id = COALESCE($5, brewery_id)
                WHERE id = $6
                RETURNING *`,
                [name, type, alcool_pourcent, details_beer_id, brewery_id, id]
            );

            res.status(200).json({ beer: result.rows[0] });
        } catch (error) {
            console.error(`Erreur lors de la mise à jour de la bière ${id}.`, error);
            res.status(500).json({ error: "Erreur interne du serveur" });
        }
    },

    delete: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
    
        try {
            // Vérification si la bière existe
            const beerExists = await pool.query("SELECT * FROM beer WHERE id = $1", [id]);
            if (beerExists.rows.length === 0) {
                res.status(404).json({ error: `Bière avec l'ID ${id} introuvable.` });
                return;
            }

             // Suppression des détails associés à la bière
            await pool.query("DELETE FROM details_beer WHERE beer_id = $1", [id]);

            // Suppression de la bière
            await pool.query("DELETE FROM beer WHERE id = $1", [id]);
    
            res.status(200).json({ message: `Bière avec l'ID ${id} et ses détails supprimés avec succès.` });
        } catch (error) {
            console.error(`Erreur lors de la suppression de la bière ${id}.`, error);
            res.status(500).json({ error: "Erreur interne du serveur." });
        }
    },

    // deleteAll: async (req: Request, res: Response): Promise<void> => {
    //     try {
    //         // Suppression de toutes les bières
    //         await pool.query("DELETE FROM beer");
    
    //         res.status(200).json({ message: "Toutes les bières ont été supprimées avec succès." });
    //     } catch (error) {
    //         console.error("Erreur lors de la suppression de toutes les bières.", error);
    //         res.status(500).json({ error: "Erreur interne du serveur." });
    //     }
    // }
    
};

