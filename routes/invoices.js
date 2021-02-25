const router = require('express').Router();
let Invoice = require('../models/invoice.model');

router.route('/').get((req, res) => {
    console.log("Getting all invoices");
    Invoice.find({}).populate("invoice_customer")
        .then(invoices => res.json(invoices))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    console.log("Getting invoice by id");
    Invoice.findById(req.params.id).populate("invoice_customer")
        .then(invoices => res.json(invoices))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
    const invoice_date = Date.parse(req.body.invoice_date);
    const invoice_amount = Number(req.body.invoice_amount);
    const invoice_customer = req.body.invoice_customer;

    const newInvoice = new Invoice({
        invoice_date, invoice_amount, invoice_customer
    });

    newInvoice.save()
        .then(() => res.json('Invoice entered!'))
        .catch(err => res.status(400).json(err));
});

router.route('/:id').delete((req, res) => {
    Invoice.findByIdAndDelete(req.params.id)
        .then(() => res.json('Invoice Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').post((req, res) => {
    Invoice.findById(req.params.id).populate("invoice_customer")
        .then(invoice => {
            invoice_date = Date.parse(req.body.invoice_date);
            invoice_amount = Number(req.body.invoice_amount);
            invoice_customer = req.body.invoice_customer;

            invoice.save()
                .then(() => res.json('Invoice updated!'))
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;