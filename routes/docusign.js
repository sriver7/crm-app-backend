//Get last auth token 
//If no auth token active within last 8, then reset 
const router = require('express').Router();
let DocSignAuthToken = require('../models/docuSign_auth.model');

router.route('/').get((req, res) => {
    console.log("Attempting auth for DocuSign");
    DocSignAuthToken.find()
        .then(authtokens => res.json(authtokens))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/last').get((req, res) => {
    console.log("Attmpting auth for DocuSign");
    DocSignAuthToken.find().sort({"_id" : -1}).limit(1)
        .then(docsigntoken => res.json(docsigntoken))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/request').get((req, res) => {
    console.log("Redirect: ");
    res.redirect('https://google.com');
    //This url will need to be 
});

router.route('/add').post((req, res) => {
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const auth_key = URLSearchParams.get('access_token');
    const auth_date = req.body.date;
    const newAuthToken = new DocSignAuthToken({
        auth_key, auth_date
    });

    newAuthToken.save()
        .then(() => res.json('Auth received!'))
        .catch(err => res.status(400).json(err));
});

module.exports = router;
