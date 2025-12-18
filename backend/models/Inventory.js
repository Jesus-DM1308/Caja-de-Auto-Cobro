const { pool } = require('../config/database');

class Inventory {
    // Get inventory for a specific branch
    static async getByBranch(branchId) {
        try {
            const query = `
                SELECT 
                    i.id,
                    i.medication_id,
                    m.name AS medication_name,
                    m.price,
                    m.pharmaceutical_company,
                    i.quantity,
                    i.min_stock,
                    CASE 
                        WHEN i.quantity = 0 THEN 'out'
                        WHEN i.quantity <= i.min_stock THEN 'low'
                        ELSE 'ok'
                    END AS stock_status
                FROM inventory i
                JOIN medications m ON i.medication_id = m.id
                WHERE i.branch_id = ? AND m.is_active = TRUE
                ORDER BY m.name ASC
            `;

            const [rows] = await pool.execute(query, [branchId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Check medication availability across all branches
    static async checkAvailability(medicationId) {
        try {
            const query = `
                SELECT 
                    b.id AS branch_id,
                    b.name AS branch_name,
                    b.address,
                    b.latitude,
                    b.longitude,
                    b.phone,
                    i.quantity,
                    CASE 
                        WHEN i.quantity = 0 THEN 'out'
                        WHEN i.quantity <= i.min_stock THEN 'low'
                        ELSE 'available'
                    END AS availability_status
                FROM branches b
                LEFT JOIN inventory i ON b.id = i.branch_id AND i.medication_id = ?
                WHERE b.is_active = TRUE
                ORDER BY i.quantity DESC
            `;

            const [rows] = await pool.execute(query, [medicationId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Get low stock items
    static async getLowStock(branchId = null) {
        try {
            let query = `
                SELECT 
                    i.id,
                    i.medication_id,
                    m.name AS medication_name,
                    m.pharmaceutical_company,
                    b.id AS branch_id,
                    b.name AS branch_name,
                    i.quantity,
                    i.min_stock
                FROM inventory i
                JOIN medications m ON i.medication_id = m.id
                JOIN branches b ON i.branch_id = b.id
                WHERE i.quantity <= i.min_stock 
                AND m.is_active = TRUE 
                AND b.is_active = TRUE
            `;

            const params = [];

            if (branchId) {
                query += ' AND i.branch_id = ?';
                params.push(branchId);
            }

            query += ' ORDER BY i.quantity ASC, m.name ASC';

            const [rows] = await pool.execute(query, params);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Update stock quantity
    static async updateStock(inventoryId, quantity) {
        try {
            const [result] = await pool.execute(
                'UPDATE inventory SET quantity = ? WHERE id = ?',
                [quantity, inventoryId]
            );

            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    // Check if medication is in stock at branch
    static async checkStock(medicationId, branchId, requiredQuantity = 1) {
        try {
            const query = `
                SELECT quantity 
                FROM inventory 
                WHERE medication_id = ? AND branch_id = ?
            `;

            const [rows] = await pool.execute(query, [medicationId, branchId]);

            if (rows.length === 0) {
                return { available: false, quantity: 0 };
            }

            return {
                available: rows[0].quantity >= requiredQuantity,
                quantity: rows[0].quantity
            };
        } catch (error) {
            throw error;
        }
    }

    // Add or update inventory for a medication at a branch
    static async upsert(medicationId, branchId, quantity, minStock = 10) {
        try {
            const query = `
                INSERT INTO inventory (medication_id, branch_id, quantity, min_stock)
                VALUES (?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE 
                    quantity = VALUES(quantity),
                    min_stock = VALUES(min_stock)
            `;

            const [result] = await pool.execute(query, [medicationId, branchId, quantity, minStock]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Inventory;
