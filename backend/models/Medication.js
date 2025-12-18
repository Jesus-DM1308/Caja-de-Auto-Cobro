const { pool } = require('../config/database');

class Medication {
    // Get all medications with optional filters
    static async getAll(filters = {}) {
        try {
            let query = `
                SELECT 
                    m.id,
                    m.name,
                    m.description,
                    m.price,
                    m.image_url,
                    m.barcode,
                    m.pharmaceutical_company,
                    m.is_bestseller,
                    m.requires_prescription,
                    GROUP_CONCAT(DISTINCT ai.name SEPARATOR ', ') AS active_ingredients,
                    md.instructions,
                    md.warnings
                FROM medications m
                LEFT JOIN medication_ingredients mi ON m.id = mi.medication_id
                LEFT JOIN active_ingredients ai ON mi.ingredient_id = ai.id
                LEFT JOIN medication_details md ON m.id = md.medication_id
                WHERE m.is_active = TRUE
            `;

            const params = [];

            // Apply filters
            if (filters.bestseller) {
                query += ' AND m.is_bestseller = TRUE';
            }

            if (filters.pharmaceutical) {
                query += ' AND m.pharmaceutical_company = ?';
                params.push(filters.pharmaceutical);
            }

            query += ' GROUP BY m.id ORDER BY m.name ASC';

            const [rows] = await pool.execute(query, params);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Get medication by ID
    static async getById(id) {
        try {
            const query = `
                SELECT 
                    m.id,
                    m.name,
                    m.description,
                    m.price,
                    m.image_url,
                    m.barcode,
                    m.pharmaceutical_company,
                    m.is_bestseller,
                    m.requires_prescription,
                    GROUP_CONCAT(DISTINCT ai.name SEPARATOR ', ') AS active_ingredients,
                    md.instructions,
                    md.warnings,
                    md.side_effects,
                    md.contraindications
                FROM medications m
                LEFT JOIN medication_ingredients mi ON m.id = mi.medication_id
                LEFT JOIN active_ingredients ai ON mi.ingredient_id = ai.id
                LEFT JOIN medication_details md ON m.id = md.medication_id
                WHERE m.id = ? AND m.is_active = TRUE
                GROUP BY m.id
            `;

            const [rows] = await pool.execute(query, [id]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    // Search medications
    static async search(searchTerm, filterType = 'medicamento') {
        try {
            let query = `
                SELECT 
                    m.id,
                    m.name,
                    m.description,
                    m.price,
                    m.image_url,
                    m.pharmaceutical_company,
                    m.is_bestseller,
                    GROUP_CONCAT(DISTINCT ai.name SEPARATOR ', ') AS active_ingredients
                FROM medications m
                LEFT JOIN medication_ingredients mi ON m.id = mi.medication_id
                LEFT JOIN active_ingredients ai ON mi.ingredient_id = ai.id
                WHERE m.is_active = TRUE
            `;

            const params = [];
            const searchPattern = `%${searchTerm}%`;

            if (filterType === 'medicamento') {
                query += ' AND (m.name LIKE ? OR m.description LIKE ?)';
                params.push(searchPattern, searchPattern);
            } else if (filterType === 'activo') {
                query += ' AND ai.name LIKE ?';
                params.push(searchPattern);
            } else if (filterType === 'farmaceutica') {
                query += ' AND m.pharmaceutical_company LIKE ?';
                params.push(searchPattern);
            }

            query += ' GROUP BY m.id ORDER BY m.name ASC';

            const [rows] = await pool.execute(query, params);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Get bestsellers
    static async getBestsellers(limit = 4) {
        try {
            const query = `
                SELECT 
                    m.id,
                    m.name,
                    m.description,
                    m.price,
                    m.image_url,
                    m.pharmaceutical_company,
                    GROUP_CONCAT(DISTINCT ai.name SEPARATOR ', ') AS active_ingredients
                FROM medications m
                LEFT JOIN medication_ingredients mi ON m.id = mi.medication_id
                LEFT JOIN active_ingredients ai ON mi.ingredient_id = ai.id
                WHERE m.is_active = TRUE AND m.is_bestseller = TRUE
                GROUP BY m.id
                ORDER BY m.name ASC
                LIMIT ?
            `;

            const [rows] = await pool.execute(query, [limit]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Create new medication (admin)
    static async create(medicationData) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // Insert medication
            const [result] = await connection.execute(
                `INSERT INTO medications 
                (name, description, price, image_url, barcode, pharmaceutical_company, is_bestseller, requires_prescription)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    medicationData.name,
                    medicationData.description,
                    medicationData.price,
                    medicationData.image_url,
                    medicationData.barcode,
                    medicationData.pharmaceutical_company,
                    medicationData.is_bestseller || false,
                    medicationData.requires_prescription || false
                ]
            );

            const medicationId = result.insertId;

            // Insert medication details if provided
            if (medicationData.instructions || medicationData.warnings) {
                await connection.execute(
                    `INSERT INTO medication_details (medication_id, instructions, warnings, side_effects, contraindications)
                    VALUES (?, ?, ?, ?, ?)`,
                    [
                        medicationId,
                        medicationData.instructions,
                        medicationData.warnings,
                        medicationData.side_effects,
                        medicationData.contraindications
                    ]
                );
            }

            await connection.commit();
            return medicationId;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    // Update medication (admin)
    static async update(id, medicationData) {
        try {
            const [result] = await pool.execute(
                `UPDATE medications 
                SET name = ?, description = ?, price = ?, image_url = ?, 
                    pharmaceutical_company = ?, is_bestseller = ?, requires_prescription = ?
                WHERE id = ?`,
                [
                    medicationData.name,
                    medicationData.description,
                    medicationData.price,
                    medicationData.image_url,
                    medicationData.pharmaceutical_company,
                    medicationData.is_bestseller,
                    medicationData.requires_prescription,
                    id
                ]
            );

            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    // Delete medication (soft delete)
    static async delete(id) {
        try {
            const [result] = await pool.execute(
                'UPDATE medications SET is_active = FALSE WHERE id = ?',
                [id]
            );

            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Medication;
