'use strict';

const connectToDatabase = require('./db');
const Payment = require('./models/payment.model');
require('dotenv').config({ path: './variables.env' });

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Payment.create(JSON.parse(event.body))
        .then(payment => callback(null, {
          statusCode: 200,
          body: JSON.stringify(payment)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: {
            'Content-Type': 'text/plain'
          },
          body: 'Could not create the payment.'
        }));
    });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Payment.findById(event.pathParameters.id)
        .then(payment => callback(null, {
          statusCode: 200,
          body: JSON.stringify(payment)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: {
            'Content-Type': 'text/plain'
          },
          body: 'Could not fetch the payment.'
        }));
    });
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Payment.find()
        .then(payments => callback(null, {
          statusCode: 200,
          body: JSON.stringify(payments)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: {
            'Content-Type': 'text/plain'
          },
          body: 'Could not fetch the payments.'
        }))
    });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Payment.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), {
          new: true
        })
        .then(payment => callback(null, {
          statusCode: 200,
          body: JSON.stringify(payment)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: {
            'Content-Type': 'text/plain'
          },
          body: 'Could not fetch the payments.'
        }));
    });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Payment.findByIdAndRemove(event.pathParameters.id)
        .then(customer => callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Removed payment with id: ' + payment._id,
            payment: payment
          })
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: {
            'Content-Type': 'text/plain'
          },
          body: 'Could not fetch the payment.'
        }));
    });
};