const express = require('express');
const router = express.Router();

let orders = [];

// Get all
router.get('/', (req, res, next) => {
  res.status(200).json(orders);
});

router.post('/', (req, res, next) => {
  const order = {
    id: orders.length + 1,
    productId: req.body.productId,
    quantity: req.body.quantity
  }
  orders.push(order);
  res.status(200).json({
    order: order
  });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    message: `ID: ${id}.`
  });
})

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    message: 'Updated'
  });
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    message: 'Deleted'
  });
})

module.exports = router;