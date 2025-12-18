const express = require('express');
const router = express.Router();
const Medication = require('../models/Medication');
const { auth, isAdmin } = require('../middleware/auth');
const { medicationValidation, validate } = require('../middleware/validator');

// @route   GET /api/medications
// @desc    Get all medications
// @access  Public
router.get('/', async (req, res, next) => {
    try {
        const { pharmaceutical, bestseller } = req.query;

        const filters = {};
        if (pharmaceutical) filters.pharmaceutical = pharmaceutical;
        if (bestseller === 'true') filters.bestseller = true;

        const medications = await Medication.getAll(filters);

        res.json({
            success: true,
            count: medications.length,
            data: medications
        });
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/medications/bestsellers
// @desc    Get bestseller medications
// @access  Public
router.get('/bestsellers', async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 4;
        const medications = await Medication.getBestsellers(limit);

        res.json({
            success: true,
            count: medications.length,
            data: medications
        });
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/medications/search
// @desc    Search medications
// @access  Public
router.get('/search', async (req, res, next) => {
    try {
        const { q, filter } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }

        const filterType = filter || 'medicamento';
        const medications = await Medication.search(q, filterType);

        res.json({
            success: true,
            count: medications.length,
            data: medications
        });
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/medications/:id
// @desc    Get medication by ID
// @access  Public
router.get('/:id', async (req, res, next) => {
    try {
        const medication = await Medication.getById(req.params.id);

        if (!medication) {
            return res.status(404).json({
                success: false,
                message: 'Medication not found'
            });
        }

        res.json({
            success: true,
            data: medication
        });
    } catch (error) {
        next(error);
    }
});

// @route   POST /api/medications
// @desc    Create new medication
// @access  Private (Admin only)
router.post('/', auth, isAdmin, medicationValidation.create, validate, async (req, res, next) => {
    try {
        const medicationId = await Medication.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Medication created successfully',
            data: { id: medicationId }
        });
    } catch (error) {
        next(error);
    }
});

// @route   PUT /api/medications/:id
// @desc    Update medication
// @access  Private (Admin only)
router.put('/:id', auth, isAdmin, medicationValidation.update, validate, async (req, res, next) => {
    try {
        const updated = await Medication.update(req.params.id, req.body);

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: 'Medication not found'
            });
        }

        res.json({
            success: true,
            message: 'Medication updated successfully'
        });
    } catch (error) {
        next(error);
    }
});

// @route   DELETE /api/medications/:id
// @desc    Delete medication (soft delete)
// @access  Private (Admin only)
router.delete('/:id', auth, isAdmin, async (req, res, next) => {
    try {
        const deleted = await Medication.delete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Medication not found'
            });
        }

        res.json({
            success: true,
            message: 'Medication deleted successfully'
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
