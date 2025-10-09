const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

// Web payment routes - operatorID est optionnel
router.get('/:acquirertrxref/:operatorID', paymentController.webpayment);
router.get('/:acquirertrxref', paymentController.webpayment);

module.exports = router;
