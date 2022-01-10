const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');
const getBaseUrl = require('../../global/utils');

// Get all
router.get('/', (req, res, next) => {
  Product
    .find()
    .select('name quantity _id')
    .exec()
    .then(docs => {
      if (docs) {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
            return {
              name: doc.name,
              quantity: doc.quantity,
              _id: doc._id,
              request: {
                type: 'GET',
                url: getUrl() + doc._id
              }
            }
          })
        }
        res.status(200).json(response);
      }
      else {
        res.status(404).json({
          message: 'No records found.'
        })
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});

// Get
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Product
    .findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      }
      else {
        res.status(404).json({
          message: "No record found for the provided ID."
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});

// Post
router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    quantity: req.body.quantity
  });

  product
    .save()
    .then(result => {
      res.status(201).json({
        product: {
          _id: result._id,
          name: result.name,
          quantity: result.quantity
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});

// Put
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  Product.updateOne({ _id: id }, {
    $set: { 
      name: req.body.name,
      quantity: req.body.quantity
    }
  })
  .then(
    res.status(200).json({
      message: 'Updated'
    }))
  .catch(error => {
    res.status(500).json({
      error: error
    });
  });
});

// Delete
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  Product.remove({ _id: id })
    .then(
      res.status(200).json({
        message: 'Deleted'
      })
    )
    .catch(error => {
      res.status(500).json({
        error: error
      });
    })
});

function getUrl() {
  return getBaseUrl() + 'products/';
}

module.exports = router;