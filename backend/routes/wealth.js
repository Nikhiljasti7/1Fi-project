const express = require('express');
const router = express.Router();
const {
  getCollateral,
  calculateOffset,
  createOrder,
  listOrders,
  prepayOrder,
} = require('../controllers/wealthController');

// Direct & nested routes for /api/wealth and /api/orders
router.get('/collateral', getCollateral);
router.post('/calculate-offset', calculateOffset);

router.get('/orders', listOrders);
router.post('/orders', createOrder);
router.post('/orders/:orderId/prepay', prepayOrder);

router.get('/', (req, res) => {
  // If mounted at /api/orders, returns orders
  if (req.baseUrl.includes('orders')) {
    return listOrders(req, res);
  }
  return getCollateral(req, res);
});

router.post('/', (req, res) => {
  if (req.baseUrl.includes('orders')) {
    return createOrder(req, res);
  }
  return calculateOffset(req, res);
});

router.post('/:orderId/prepay', prepayOrder);

module.exports = router;
