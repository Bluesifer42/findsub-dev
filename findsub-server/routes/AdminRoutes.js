// 📦 /routes/AdminRoutes.js
console.log('📦 /routes/AdminRoutes.js mounted');

const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

// ===============================
// 🛠 Admin Kink Routes
// Prefix: /api/kinks
// ===============================

/**
 * Get all kinks.
 * GET /api/kinks
 */
router.get('/', AdminController.getAllKinks);

/**
 * Create a new kink.
 * POST /api/kinks/create
 */
router.post('/create', AdminController.createKink);

/**
 * Update a kink by ID.
 * PUT /api/kinks/:id
 */
router.put('/:id', AdminController.updateKink);

/**
 * Delete a kink by ID.
 * DELETE /api/kinks/:id
 */
router.delete('/:id', AdminController.deleteKink);

module.exports = router;
