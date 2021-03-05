'use strict';

const connectToDatabase = require('./db');
const DocuSign = require('./models/docuSign_auth.model');
require('dotenv').config({ path: './variables.env' });

/*
This route will be hit when redirected from DocuSign
URL Params will have Auth Key that needs to be temp
stored for use by the application. 
*/
module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const auth_key = urlParams.get('access_token');
  const auth_date = req.body.date;

  connectToDatabase()
    .then(() => {
      DocuSign.create(JSON.parse({
          auth_key, auth_date
      }))
        .then(docusign => callback(null, {
          statusCode: 200,
          body: JSON.stringify(docusign)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: {
            'Content-Type': 'text/plain'
          },
          body: 'Could not create the docusign auth.'
        }));
    });
};

module.exports.getLast = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      DocuSign.find().sort({"_id": -1}).limit(1)
        .then(docusign => callback(null, {
          statusCode: 200,
          body: JSON.stringify(docusign)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: {
            'Content-Type': 'text/plain'
          },
          body: 'Could not get the DocuSign Auth.'
        }));
    });
};

// TODO: Redirect request for DocuSign when Ready in FE
