const router = require('express').Router();
let Customer = require('../models/customer.model');

router.route('/').get((req, res) => {
    Customer.find()
        .then(customers => res.json(customers))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const customer_name = req.body.customer_name;
    const customer_phone_1 = req.body.customer_phone_1;
    const customer_phone_2 = req.body.customer_phone_2;
    const customer_address_1 = req.body.customer_address_1;
    const customer_city = req.body.customer_city;
    const customer_state = req.body.customer_state;
    const customer_zip = req.body.customer_zip;
    const customer_email = req.body.customer_email;
    const customer_note = req.body.customer_note;
    const customer_is_active = req.body.customer_is_active;

    const newCustomer = new Customer({
        customer_name, customer_phone_1, customer_phone_2, customer_address_1, customer_city, customer_state, customer_zip, customer_email, customer_note, customer_is_active
    });

    newCustomer.save()
        .then(() => res.json('Customer created!'))
        .catch(err => res.status(400).json(err));
});

router.route('/:id').get((req, res) => {
    Customer.findById(req.params.id)
        .then(customer => res.json(customer))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Customer.findByIdAndDelete(req.params.id)
        .then(() => res.json('Customer deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').post((req, res) => {
    Customer.findById(req.params.id)
        .then(customer => {
            const customer_name = req.body.customer_name;
            const customer_phone_1 = req.body.customer_phone_1;
            const customer_phone_2 = req.body.customer_phone_2;
            const customer_address_1 = req.body.customer_address_1;
            const customer_city = req.body.customer_city;
            const customer_state = req.body.customer_state;
            const customer_zip = req.body.customer_zip;
            const customer_email = req.body.customer_email;
            const customer_note = req.body.customer_note;
            const customer_is_active = req.body.customer_is_active;

        customer.save()
            .then(() => res.json('Customer updated!'))
            .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;