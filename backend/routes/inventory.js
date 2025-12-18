const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');
const { auth, isAdminOrManager } = require('../middleware/auth');
const { inventoryValidation, validate } = require('../middleware/validator');

// @route   GET /api/inventory/branch/:branchId
// @desc    Get inventory for a branch
// @access  Public
router.get('/branch/:branchId', async (req, res, next) => {
    try {
        const inventory = await Inventory.getByBranch(req.params.branchId);

        res.json({
            success: true,
            count: inventory.length,
            data: inventory
        });
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/inventory/medication/:medicationId
// @desc    Check medication availability across branches
// @access  Public
router.get('/medication/:medicationId', async (req, res, next) => {
    try {
        const availability = await Inventory.checkAvailability(req.params.medicationId);

        res.json({
            success: true,
            data: availability
        });
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/inventory/low-stock
// @desc    Get low stock items
// @access  Private (Admin/Manager)
router.get('/low-stock', auth, isAdminOrManager, async (req, res, next) => {
    try {
        const branchId = req.query.branch_id || null;
        const lowStock = await Inventory.getLowStock(branchId);

        res.json({
            success: true,
            count: lowStock.length,
            data: lowStock
        });
    } catch (error) {
        next(error);
    }
});

// @route   PUT /api/inventory/:id
// @desc    Update inventory stock
// @access  Private (Admin/Manager)
router.put('/:id', auth, isAdminOrManager, inventoryValidation.update, validate, async (req, res, next) => {
    try {
        const { quantity } = req.body;
        const updated = await Inventory.updateStock(req.params.id, quantity);

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: 'Inventory record not found'
            });
        }

        res.json({
            success: true,
            message: 'Inventory updated successfully'
        });
    } catch (error) {
        next(error);
    }
});

// @route   POST /api/inventory/check-stock
// @desc    Check if medication is in stock
// @access  Public
router.post('/check-stock', async (req, res, next) => {
    try {
        const { medication_id, branch_id, quantity } = req.body;

        if (!medication_id || !branch_id) {
            return res.status(400).json({
                success: false,
                message: 'medication_id and branch_id are required'
            });
        }

        const stockCheck = await Inventory.checkStock(
            medication_id,
            branch_id,
            quantity || 1
        );

        res.json({
            success: true,
            data: stockCheck
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
