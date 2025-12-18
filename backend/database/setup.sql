-- ============================================
-- Quick Setup Script for Pharmacy Auto-Cobro
-- Run this in phpMyAdmin or MySQL Workbench
-- ============================================

-- Step 1: Create and use database
CREATE DATABASE IF NOT EXISTS pharmacy_autocobro
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE pharmacy_autocobro;

-- Step 2: Show success message
SELECT 'Database created successfully!' AS Status;

-- Step 3: Instructions
SELECT 'Next steps:' AS Instructions
UNION ALL
SELECT '1. Run schema.sql to create tables'
UNION ALL
SELECT '2. Run seed.sql to insert initial data'
UNION ALL
SELECT '3. Start the backend server with: npm run dev';
