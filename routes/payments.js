const router = require('express').Router();
const { query } = require('express');
let Payment = require('../models/payment.model');

router.route('/').get((req, res) => {
    console.log("Getting all payments");
    Payment.find({}).populate("payment_customer")
        .then(payments => res.json(payments))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    console.log("Get payment by id");
    Payment.findById(req.params.id).populate("payment_customer")
        .then(payments => res.json(payments))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/find/:query').get((req, res) =>{
    console.log("Get payment from customer id");
    Payment.find(
        {
            "payment_customer": req.params.query
        }
    )
        .then(payments => res.json(payments))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req, res) => {
    const payment_date = Date.parse(req.body.payment_date);
    const payment_amount = Number(req.body.payment_amount);
    const payment_check_num = req.body.payment_check_num;
    const payment_customer = req.body.payment_customer;

    const newPayment = new Payment({
        payment_date, payment_amount, payment_check_num, payment_customer
    });

    newPayment.save()
        .then(() => res.json('Payment entered!'))
        .catch(err => res.status(400).json(err));
});

router.route('/:id').delete((req, res) => {
    Payment.findByIdAndDelete(req.params.id)
        .then(() => res.json('Payment Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Payment.findById(req.params.id).populate("payment_customer")
        .then(payment => {
            payment_date = Date.parse(req.body.payment_date);
            payment_amount = Number(req.body.payment_amount);
            payment_check_num = req.body.payment_check_num;
            payment_customer = req.body.payment_customer;

            payment.save()
                .then(() => res.json('Payment updated!'))
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;