const { body, param, query, validationResult } = require('express-validator');

// Validation result handler
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
};

// Medication validation rules
const medicationValidation = {
    create: [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('description').optional().trim(),
        body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
        body('pharmaceutical_company').trim().notEmpty().withMessage('Pharmaceutical company is required'),
        body('is_bestseller').optional().isBoolean(),
        body('requires_prescription').optional().isBoolean()
    ],
    update: [
        param('id').isInt().withMessage('Invalid medication ID'),
        body('name').optional().trim().notEmpty(),
        body('price').optional().isFloat({ min: 0 }),
        body('pharmaceutical_company').optional().trim().notEmpty()
    ]
};

// Transaction validation rules
const transactionValidation = {
    create: [
        body('branch_id').isInt().withMessage('Branch ID is required'),
        body('total_amount').isFloat({ min: 0 }).withMessage('Total amount must be positive'),
        body('payment_method').isIn(['cash', 'card', 'mixed']).withMessage('Invalid payment method'),
        body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
        body('items.*.medication_id').isInt().withMessage('Invalid medication ID'),
        body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
        body('items.*.unit_price').isFloat({ min: 0 }).withMessage('Unit price must be positive'),
        body('items.*.subtotal').isFloat({ min: 0 }).withMessage('Subtotal must be positive')
    ]
};

// User validation rules
const userValidation = {
    register: [
        body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        body('role').optional().isIn(['admin', 'manager', 'staff']).withMessage('Invalid role')
    ],
    login: [
        body('username').trim().notEmpty().withMessage('Username is required'),
        body('password').notEmpty().withMessage('Password is required')
    ]
};

// Inventory validation rules
const inventoryValidation = {
    update: [
        param('id').isInt().withMessage('Invalid inventory ID'),
        body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer')
    ]
};

module.exports = {
    validate,
    medicationValidation,
    transactionValidation,
    userValidation,
    inventoryValidation
};
