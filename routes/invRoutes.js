const express = require('express');
const router = express.Router();
const invControllers = require('../controllers/invoiceControllers');

router.get('/', invControllers.invoices_get);

router.get('/new-invoice', invControllers.invoice_create_get);

router.post('/invoice', invControllers.invoice_post);

// Editting
router.post('/invoice/:id', invControllers.invoice_edit);

// Mark as paid
router.put('/invoice/:id', invControllers.invoice_update);

router.get('/invoice/:id', invControllers.invoice_get);

router.delete('/invoice/:id', invControllers.invoice_delete);

module.exports = router;
