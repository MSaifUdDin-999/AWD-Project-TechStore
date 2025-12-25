const express = require('express');
const router = express.Router();

// --- PAY ATTENTION TO THIS LINE ---
// You must import BOTH functions: addOrderItems AND getOrderById
const { addOrderItems, getOrderById, getMyOrders } = require('../controllers/orderController'); 
const { protect } = require('../middleware/authMiddleware');

// This route is protected. Only logged in users can post orders.
router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);

module.exports = router;

