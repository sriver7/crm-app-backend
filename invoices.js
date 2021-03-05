'use strict';

const connectToDatabase = require('./db');
const Invoice = require('./models/invoice.model');
require('dotenv').config({ path: './variables.env' });

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Invoice.create(JSON.parse(event.body))
        .then(invoice => callback(null, {
          statusCode: 200,
          body: JSON.stringify(invoice)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: {
            'Content-Type': 'text/plain'
          },
          body: 'Could not create the invoice.'
        }));
    });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Invoice.findById(event.pathParameters.id)
        .then(invoice => callback(null, {
          statusCode: 200,
          body: JSON.stringify(invoice)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: {
            'Content-Type': 'text/plain'
          },
          body: 'Could not fetch the invoice.'
        }));
    });
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Invoice.find()
        .then(invoices => callback(null, {
          statusCode: 200,
          body: JSON.stringify(invoices)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: {
            'Content-Type': 'text/plain'
          },
          body: 'Could not fetch the invoices.'
        }))
    });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Invoice.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), {
          new: true
        })
        .then(invoice => callback(null, {
          statusCode: 200,
          body: JSON.stringify(invoice)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: {
            'Content-Type': 'text/plain'
          },
          body: 'Could not fetch the invoices.'
        }));
    });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Invoice.findByIdAndRemove(event.pathParameters.id)
        .then(invoice => callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Removed invoice with id: ' + invoice._id,
            invoice: invoice
          })
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: {
            'Content-Type': 'text/plain'
          },
          body: 'Could not fetch the invoice.'
        }));
    });
};

module.exports.getByCustomer = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Invoice.find(
            {
              "invoice_customer": event.pathParameters.query
            }
        )
        .then(invoice => callback(null, {
          statusCode: 200,
          body: JSON.stringify(invoice)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: {
            'Content-Type': 'text/plain'
          },
          body: err
        }));
    });
};