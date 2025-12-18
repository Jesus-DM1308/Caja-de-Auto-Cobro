-- ============================================
-- Pharmacy Auto-Cobro Database Schema
-- MySQL 8.0+
-- ============================================

-- Create database
CREATE DATABASE IF NOT EXISTS pharmacy_autocobro
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE pharmacy_autocobro;

-- ============================================
-- Table: branches
-- ============================================
CREATE TABLE branches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(500),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: medications
-- ============================================
CREATE TABLE medications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(500),
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(500),
    barcode VARCHAR(100) UNIQUE,
    pharmaceutical_company VARCHAR(255),
    is_bestseller BOOLEAN DEFAULT FALSE,
    requires_prescription BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_barcode (barcode),
    INDEX idx_pharmaceutical (pharmaceutical_company),
    INDEX idx_bestseller (is_bestseller),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: active_ingredients
-- ============================================
CREATE TABLE active_ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: medication_ingredients (Many-to-Many)
-- ============================================
CREATE TABLE medication_ingredients (
    medication_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    PRIMARY KEY (medication_id, ingredient_id),
    FOREIGN KEY (medication_id) REFERENCES medications(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES active_ingredients(id) ON DELETE CASCADE,
    INDEX idx_medication (medication_id),
    INDEX idx_ingredient (ingredient_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: medication_details
-- ============================================
CREATE TABLE medication_details (
    medication_id INT PRIMARY KEY,
    instructions TEXT,
    warnings TEXT,
    side_effects TEXT,
    contraindications TEXT,
    FOREIGN KEY (medication_id) REFERENCES medications(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: inventory
-- ============================================
CREATE TABLE inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    medication_id INT NOT NULL,
    branch_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    min_stock INT DEFAULT 10,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (medication_id) REFERENCES medications(id) ON DELETE CASCADE,
    FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE CASCADE,
    UNIQUE KEY unique_medication_branch (medication_id, branch_id),
    INDEX idx_medication (medication_id),
    INDEX idx_branch (branch_id),
    INDEX idx_low_stock (quantity, min_stock)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: users (Admin/Staff)
-- ============================================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager', 'staff') DEFAULT 'staff',
    branch_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE SET NULL,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: transactions
-- ============================================
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    branch_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('cash', 'card', 'mixed') NOT NULL,
    cash_amount DECIMAL(10, 2) DEFAULT 0.00,
    card_amount DECIMAL(10, 2) DEFAULT 0.00,
    cash_received DECIMAL(10, 2) DEFAULT 0.00,
    change_given DECIMAL(10, 2) DEFAULT 0.00,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'completed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE RESTRICT,
    INDEX idx_branch (branch_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_payment_method (payment_method)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: transaction_items
-- ============================================
CREATE TABLE transaction_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_id INT NOT NULL,
    medication_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
    FOREIGN KEY (medication_id) REFERENCES medications(id) ON DELETE RESTRICT,
    INDEX idx_transaction (transaction_id),
    INDEX idx_medication (medication_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Views for easier querying
-- ============================================

-- View: Medications with ingredients
CREATE VIEW v_medications_full AS
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
    GROUP_CONCAT(ai.name SEPARATOR ', ') AS active_ingredients,
    md.instructions,
    md.warnings,
    md.side_effects,
    md.contraindications
FROM medications m
LEFT JOIN medication_ingredients mi ON m.id = mi.medication_id
LEFT JOIN active_ingredients ai ON mi.ingredient_id = ai.id
LEFT JOIN medication_details md ON m.id = md.medication_id
WHERE m.is_active = TRUE
GROUP BY m.id;

-- View: Inventory with medication details
CREATE VIEW v_inventory_full AS
SELECT 
    i.id,
    i.medication_id,
    m.name AS medication_name,
    m.price,
    i.branch_id,
    b.name AS branch_name,
    i.quantity,
    i.min_stock,
    CASE 
        WHEN i.quantity <= i.min_stock THEN 'low'
        WHEN i.quantity = 0 THEN 'out'
        ELSE 'ok'
    END AS stock_status,
    i.last_updated
FROM inventory i
JOIN medications m ON i.medication_id = m.id
JOIN branches b ON i.branch_id = b.id
WHERE m.is_active = TRUE AND b.is_active = TRUE;

-- ============================================
-- Triggers
-- ============================================

-- Trigger: Update inventory after transaction
DELIMITER //
CREATE TRIGGER after_transaction_item_insert
AFTER INSERT ON transaction_items
FOR EACH ROW
BEGIN
    DECLARE v_branch_id INT;
    
    -- Get branch_id from transaction
    SELECT branch_id INTO v_branch_id
    FROM transactions
    WHERE id = NEW.transaction_id;
    
    -- Update inventory
    UPDATE inventory
    SET quantity = quantity - NEW.quantity
    WHERE medication_id = NEW.medication_id
    AND branch_id = v_branch_id;
END//
DELIMITER ;

-- ============================================
-- Initial Admin User (password: admin123)
-- ============================================
-- Note: This will be created via seed.sql
