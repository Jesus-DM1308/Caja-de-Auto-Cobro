const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
    // Create new user
    static async create(userData) {
        try {
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(userData.password, salt);

            const [result] = await pool.execute(
                `INSERT INTO users (username, email, password_hash, role, branch_id, is_active)
                VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    userData.username,
                    userData.email,
                    passwordHash,
                    userData.role || 'staff',
                    userData.branch_id || null,
                    true
                ]
            );

            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    // Find user by username
    static async findByUsername(username) {
        try {
            const query = `
                SELECT 
                    u.*,
                    b.name AS branch_name
                FROM users u
                LEFT JOIN branches b ON u.branch_id = b.id
                WHERE u.username = ? AND u.is_active = TRUE
            `;

            const [rows] = await pool.execute(query, [username]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    // Find user by email
    static async findByEmail(email) {
        try {
            const query = `
                SELECT 
                    u.*,
                    b.name AS branch_name
                FROM users u
                LEFT JOIN branches b ON u.branch_id = b.id
                WHERE u.email = ? AND u.is_active = TRUE
            `;

            const [rows] = await pool.execute(query, [email]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    // Find user by ID
    static async findById(id) {
        try {
            const query = `
                SELECT 
                    u.id,
                    u.username,
                    u.email,
                    u.role,
                    u.branch_id,
                    b.name AS branch_name,
                    u.created_at
                FROM users u
                LEFT JOIN branches b ON u.branch_id = b.id
                WHERE u.id = ? AND u.is_active = TRUE
            `;

            const [rows] = await pool.execute(query, [id]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    // Verify password
    static async verifyPassword(plainPassword, hashedPassword) {
        try {
            return await bcrypt.compare(plainPassword, hashedPassword);
        } catch (error) {
            throw error;
        }
    }

    // Update user
    static async update(id, userData) {
        try {
            const updates = [];
            const params = [];

            if (userData.email) {
                updates.push('email = ?');
                params.push(userData.email);
            }

            if (userData.role) {
                updates.push('role = ?');
                params.push(userData.role);
            }

            if (userData.branch_id !== undefined) {
                updates.push('branch_id = ?');
                params.push(userData.branch_id);
            }

            if (userData.password) {
                const salt = await bcrypt.genSalt(10);
                const passwordHash = await bcrypt.hash(userData.password, salt);
                updates.push('password_hash = ?');
                params.push(passwordHash);
            }

            if (updates.length === 0) {
                return false;
            }

            params.push(id);

            const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
            const [result] = await pool.execute(query, params);

            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    // Deactivate user (soft delete)
    static async deactivate(id) {
        try {
            const [result] = await pool.execute(
                'UPDATE users SET is_active = FALSE WHERE id = ?',
                [id]
            );

            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    // Get all users
    static async getAll() {
        try {
            const query = `
                SELECT 
                    u.id,
                    u.username,
                    u.email,
                    u.role,
                    u.branch_id,
                    b.name AS branch_name,
                    u.created_at
                FROM users u
                LEFT JOIN branches b ON u.branch_id = b.id
                WHERE u.is_active = TRUE
                ORDER BY u.created_at DESC
            `;

            const [rows] = await pool.execute(query);
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;
