const router = require('express').Router();
let Quote = require('../models/invoice.model');

router.route('/').get((req, res) => {
    console.log("Getting all quotes");
    Invoice.find({}).populate("quote_customer")
        .then(quotes => res.json(quotes))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    console.log("Get quotes by id");
    Quote.findById(req.params.id).populate("quote_customer")
        .then(quotes => res.json(quotes))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req, res) => {
    const quote_status = req.body.quote_status;
    const quote_customer = req.body.quote_customer;

    const newQuote = new Quote({
        quote_status, quote_customer
    });

    newQuote.save()
        .then(() => res.json('Quote entered!'))
        .catch(err => res.status(400).json(err));
});

router.route('/:id').delete((req, res) => {
    Quote.findByIdAndDelete(req.params.id)
        .then(() => res.json('Quote Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Quote.findById(req.params.id).populate("quote_customer")
        .then(quote => {
            quote_status = req.body.quote_status
            quote_customer = req.body.quote_customer;

            quote.save()
                .then(() => res.json('Quote updated!'))
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;