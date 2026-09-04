const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const {
  getCollateral,
  calculateOffset,
  createOrder,
  listOrders,
  prepayOrder,
} = require('../controllers/wealthController');

// Public catalog & financial calculator endpoints
router.get('/collateral', getCollateral);
router.post('/calculate-offset', calculateOffset);

// User-scoped secure order management
router.get('/orders', requireAuth, listOrders);
router.post('/orders', requireAuth, createOrder);
router.post('/orders/:orderId/prepay', requireAuth, prepayOrder);

// Aliased mount handler
router.get('/', (req, res) => {
  if (req.baseUrl.includes('orders')) {
    return requireAuth(req, res, () => listOrders(req, res));
  }
  return getCollateral(req, res);
});

router.post('/', (req, res) => {
  if (req.baseUrl.includes('orders')) {
    return requireAuth(req, res, () => createOrder(req, res));
  }
  return calculateOffset(req, res);
});

router.post('/:orderId/prepay', requireAuth, prepayOrder);

module.exports = router;
