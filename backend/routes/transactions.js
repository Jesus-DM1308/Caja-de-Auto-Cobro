const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const { auth, isAdminOrManager } = require('../middleware/auth');
const { transactionValidation, validate } = require('../middleware/validator');

// @route   POST /api/transactions
// @desc    Create new transaction
// @access  Public
router.post('/', transactionValidation.create, validate, async (req, res, next) => {
    try {
        const transactionId = await Transaction.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Transaction completed successfully',
            data: { transaction_id: transactionId }
        });
    } catch (error) {
        // Check for insufficient stock
        if (error.message && error.message.includes('insufficient stock')) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock for one or more items'
            });
        }
        next(error);
    }
});

// @route   GET /api/transactions/:id
// @desc    Get transaction by ID
// @access  Private (Admin/Manager)
router.get('/:id', auth, isAdminOrManager, async (req, res, next) => {
    try {
        const transaction = await Transaction.getById(req.params.id);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found'
            });
        }

        res.json({
            success: true,
            data: transaction
        });
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/transactions/branch/:branchId
// @desc    Get transactions for a branch
// @access  Private (Admin/Manager)
router.get('/branch/:branchId', auth, isAdminOrManager, async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 50;
        const offset = parseInt(req.query.offset) || 0;

        const transactions = await Transaction.getByBranch(req.params.branchId, limit, offset);

        res.json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/transactions/reports/daily
// @desc    Get daily sales report
// @access  Private (Admin/Manager)
router.get('/reports/daily', auth, isAdminOrManager, async (req, res, next) => {
    try {
        const { branch_id, date } = req.query;

        if (!branch_id) {
            return res.status(400).json({
                success: false,
                message: 'branch_id is required'
            });
        }

        const report = await Transaction.getDailyReport(branch_id, date);

        res.json({
            success: true,
            data: report
        });
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/transactions/reports/monthly
// @desc    Get monthly sales report
// @access  Private (Admin/Manager)
router.get('/reports/monthly', auth, isAdminOrManager, async (req, res, next) => {
    try {
        const { branch_id, year, month } = req.query;

        if (!branch_id || !year || !month) {
            return res.status(400).json({
                success: false,
                message: 'branch_id, year, and month are required'
            });
        }

        const report = await Transaction.getMonthlyReport(branch_id, year, month);

        res.json({
            success: true,
            count: report.length,
            data: report
        });
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/transactions/reports/top-selling
// @desc    Get top selling medications
// @access  Private (Admin/Manager)
router.get('/reports/top-selling', auth, isAdminOrManager, async (req, res, next) => {
    try {
        const { branch_id, limit, days } = req.query;

        if (!branch_id) {
            return res.status(400).json({
                success: false,
                message: 'branch_id is required'
            });
        }

        const topSelling = await Transaction.getTopSelling(
            branch_id,
            parseInt(limit) || 10,
            parseInt(days) || 30
        );

        res.json({
            success: true,
            count: topSelling.length,
            data: topSelling
        });
    } catch (error) {
        next(error);
    }
});

// @route   PUT /api/transactions/:id/cancel
// @desc    Cancel transaction
// @access  Private (Admin only)
router.put('/:id/cancel', auth, isAdminOrManager, async (req, res, next) => {
    try {
        await Transaction.cancel(req.params.id);

        res.json({
            success: true,
            message: 'Transaction cancelled successfully'
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
