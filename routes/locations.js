const router = require('express').Router();
let Location = require('../models/location.model');

router.route('/').get((req, res) => {
    console.log("Getting all locations");
    Location.find({}).populate("loc_customer")
        .then(locations => res.json(locations))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').get((req, res) => {
    console.log("Getting a location by id");
    Location.findById(req.params.id).populate("loc_customer")
        .then(locations => res.json(locations))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req, res) => {
    const loc_address_1 = req.body.loc_address_1;
    const loc_address_2 = req.body.loc_address_2;
    const loc_city = req.body.loc_city;
    const loc_state = req.body.loc_state;
    const loc_zip = req.body.loc_zip;
    const loc_grass = req.body.loc_grass;
    const loc_mulch = req.body.loc_mulch;
    const loc_fallCleanup = req.body.loc_fallCleanup;
    const loc_fertilizer = req.body.loc_fertilizer;
    const loc_customer = req.body.loc_customer;


    const newLocation = new Location({
        loc_address_1, loc_address_2, loc_city, loc_state, loc_zip, loc_grass, loc_mulch, loc_fallCleanup, loc_fertilizer, loc_customer//, loc_active
    });

    newLocation.save()
        .then(() => res.json('Location created!'))
        .catch(err => res.status(400).json(err));
});


router.route('/:id').delete((req, res) => {
    Location.findByIdAndDelete(req.params.id)
        .then(() => res.json('Location deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Location.findById(req.params.id).populate("loc_customer")
        .then(location => {
            loc_address_1 = req.body.loc_address_1;
            loc_address_2 = req.body.loc_address_2;
            loc_city = req.body.loc_city;
            loc_state = req.body.loc_state;
            loc_zip = req.body.loc_zip;
            loc_grass = req.body.loc_grass;
            loc_mulch = req.body.loc_mulch;
            loc_fallCleanup = req.body.loc_fallCleanup;
            loc_fertilizer = req.body.loc_fertilizer;
            loc_customer = req.body.loc_customer;
    
            location.save()
                .then(() => res.json('Location updated!'))
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;