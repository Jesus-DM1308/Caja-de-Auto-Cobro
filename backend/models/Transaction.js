const { pool } = require('../config/database');

class Transaction {
    // Create new transaction
    static async create(transactionData) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // Insert transaction
            const [transactionResult] = await connection.execute(
                `INSERT INTO transactions 
                (branch_id, total_amount, payment_method, cash_amount, card_amount, cash_received, change_given, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    transactionData.branch_id,
                    transactionData.total_amount,
                    transactionData.payment_method,
                    transactionData.cash_amount || 0,
                    transactionData.card_amount || 0,
                    transactionData.cash_received || 0,
                    transactionData.change_given || 0,
                    transactionData.status || 'completed'
                ]
            );

            const transactionId = transactionResult.insertId;

            // Insert transaction items
            for (const item of transactionData.items) {
                await connection.execute(
                    `INSERT INTO transaction_items 
                    (transaction_id, medication_id, quantity, unit_price, subtotal)
                    VALUES (?, ?, ?, ?, ?)`,
                    [
                        transactionId,
                        item.medication_id,
                        item.quantity,
                        item.unit_price,
                        item.subtotal
                    ]
                );

                // Update inventory (reduce stock)
                await connection.execute(
                    `UPDATE inventory 
                    SET quantity = quantity - ? 
                    WHERE medication_id = ? AND branch_id = ?`,
                    [item.quantity, item.medication_id, transactionData.branch_id]
                );
            }

            await connection.commit();
            return transactionId;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    // Get transaction by ID
    static async getById(id) {
        try {
            const transactionQuery = `
                SELECT 
                    t.*,
                    b.name AS branch_name
                FROM transactions t
                JOIN branches b ON t.branch_id = b.id
                WHERE t.id = ?
            `;

            const [transactions] = await pool.execute(transactionQuery, [id]);

            if (transactions.length === 0) {
                return null;
            }

            const transaction = transactions[0];

            // Get transaction items
            const itemsQuery = `
                SELECT 
                    ti.*,
                    m.name AS medication_name,
                    m.pharmaceutical_company
                FROM transaction_items ti
                JOIN medications m ON ti.medication_id = m.id
                WHERE ti.transaction_id = ?
            `;

            const [items] = await pool.execute(itemsQuery, [id]);
            transaction.items = items;

            return transaction;
        } catch (error) {
            throw error;
        }
    }

    // Get transactions by branch
    static async getByBranch(branchId, limit = 50, offset = 0) {
        try {
            const query = `
                SELECT 
                    t.id,
                    t.total_amount,
                    t.payment_method,
                    t.status,
                    t.created_at,
                    COUNT(ti.id) AS item_count
                FROM transactions t
                LEFT JOIN transaction_items ti ON t.id = ti.transaction_id
                WHERE t.branch_id = ?
                GROUP BY t.id
                ORDER BY t.created_at DESC
                LIMIT ? OFFSET ?
            `;

            const [rows] = await pool.execute(query, [branchId, limit, offset]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Get daily sales report
    static async getDailyReport(branchId, date = null) {
        try {
            const targetDate = date || new Date().toISOString().split('T')[0];

            const query = `
                SELECT 
                    DATE(t.created_at) AS date,
                    COUNT(t.id) AS total_transactions,
                    SUM(t.total_amount) AS total_sales,
                    SUM(CASE WHEN t.payment_method = 'cash' THEN t.total_amount ELSE 0 END) AS cash_sales,
                    SUM(CASE WHEN t.payment_method = 'card' THEN t.total_amount ELSE 0 END) AS card_sales,
                    SUM(CASE WHEN t.payment_method = 'mixed' THEN t.total_amount ELSE 0 END) AS mixed_sales,
                    SUM(ti.quantity) AS total_items_sold
                FROM transactions t
                LEFT JOIN transaction_items ti ON t.id = ti.transaction_id
                WHERE t.branch_id = ? 
                AND DATE(t.created_at) = ?
                AND t.status = 'completed'
                GROUP BY DATE(t.created_at)
            `;

            const [rows] = await pool.execute(query, [branchId, targetDate]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    // Get monthly sales report
    static async getMonthlyReport(branchId, year, month) {
        try {
            const query = `
                SELECT 
                    DATE(t.created_at) AS date,
                    COUNT(t.id) AS transactions,
                    SUM(t.total_amount) AS sales,
                    SUM(ti.quantity) AS items_sold
                FROM transactions t
                LEFT JOIN transaction_items ti ON t.id = ti.transaction_id
                WHERE t.branch_id = ? 
                AND YEAR(t.created_at) = ?
                AND MONTH(t.created_at) = ?
                AND t.status = 'completed'
                GROUP BY DATE(t.created_at)
                ORDER BY date ASC
            `;

            const [rows] = await pool.execute(query, [branchId, year, month]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Get top selling medications
    static async getTopSelling(branchId, limit = 10, days = 30) {
        try {
            const query = `
                SELECT 
                    m.id,
                    m.name,
                    m.pharmaceutical_company,
                    SUM(ti.quantity) AS total_sold,
                    SUM(ti.subtotal) AS total_revenue
                FROM transaction_items ti
                JOIN transactions t ON ti.transaction_id = t.id
                JOIN medications m ON ti.medication_id = m.id
                WHERE t.branch_id = ?
                AND t.created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
                AND t.status = 'completed'
                GROUP BY m.id
                ORDER BY total_sold DESC
                LIMIT ?
            `;

            const [rows] = await pool.execute(query, [branchId, days, limit]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Cancel transaction
    static async cancel(id) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // Get transaction details
            const [transactions] = await connection.execute(
                'SELECT * FROM transactions WHERE id = ?',
                [id]
            );

            if (transactions.length === 0) {
                throw new Error('Transaction not found');
            }

            const transaction = transactions[0];

            // Get transaction items
            const [items] = await connection.execute(
                'SELECT * FROM transaction_items WHERE transaction_id = ?',
                [id]
            );

            // Restore inventory
            for (const item of items) {
                await connection.execute(
                    `UPDATE inventory 
                    SET quantity = quantity + ? 
                    WHERE medication_id = ? AND branch_id = ?`,
                    [item.quantity, item.medication_id, transaction.branch_id]
                );
            }

            // Update transaction status
            await connection.execute(
                'UPDATE transactions SET status = ? WHERE id = ?',
                ['cancelled', id]
            );

            await connection.commit();
            return true;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
}

module.exports = Transaction;
