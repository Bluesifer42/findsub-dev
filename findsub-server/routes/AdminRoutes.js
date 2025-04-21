const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/kinks', adminController.getAllKinks);
router.post('/kinks/create', adminController.createKink);
router.put('/kinks/:id', adminController.updateKink);
router.delete('/kinks/:id', adminController.deleteKink);

module.exports = router;
