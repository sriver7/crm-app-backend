'use strict';

const connectToDatabase = require('./db');
const Location = require('./models/location.model');
require('dotenv').config({ path: './variables.env' });

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Location.create(JSON.parse(event.body))
        .then(location => callback(null, {
          statusCode: 200,
          body: JSON.stringify(location)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: {
            'Content-Type': 'text/plain'
          },
          body: 'Could not create the location.'
        }));
    });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Location.findById(event.pathParameters.id)
        .then(location => callback(null, {
          statusCode: 200,
          body: JSON.stringify(location)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: {
            'Content-Type': 'text/plain'
          },
          body: 'Could not fetch the location.'
        }));
    });
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Location.find()
        .then(locations => callback(null, {
          statusCode: 200,
          body: JSON.stringify(locations)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: {
            'Content-Type': 'text/plain'
          },
          body: 'Could not fetch the locations.'
        }))
    });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Location.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), {
          new: true
        })
        .then(location => callback(null, {
          statusCode: 200,
          body: JSON.stringify(location)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: {
            'Content-Type': 'text/plain'
          },
          body: 'Could not fetch the locations.'
        }));
    });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Location.findByIdAndRemove(event.pathParameters.id)
        .then(location => callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Removed location with id: ' + location._id,
            location: location
          })
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: {
            'Content-Type': 'text/plain'
          },
          body: 'Could not fetch the location.'
        }));
    });
};

module.exports.getByCustomer = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Location.find(
            {
              "loc_customer": event.pathParameters.query
            }
        )
        .then(location => callback(null, {
          statusCode: 200,
          body: JSON.stringify(location)
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