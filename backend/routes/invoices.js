const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { getAll, create, getPDF } = require('../controllers/invoiceController');

router.get('/', auth, getAll);
router.post('/', auth, create);
router.get('/:id/pdf', auth, getPDF);

module.exports = router;