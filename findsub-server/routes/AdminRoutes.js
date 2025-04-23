// /routes/AdminRoutes.js
console.log('📦 /routes/AdminRoutes.js mounted');


const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/', adminController.getAllKinks);
router.post('/create', adminController.createKink);
router.put('/:id', adminController.updateKink);
router.delete('/:id', adminController.deleteKink);

module.exports = router;
