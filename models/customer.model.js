const mongoose = require('mongoose');
const CustomerSchema = new mongoose.Schema({
    customer_name: {type: String, trim: true, require: true},
    customer_phone_1: {type: String, trim: true},
    customer_phone_2: {type: String, trim: true},
    customer_address_1: {type: String, trim: true},
    customer_city: {type: String, trim: true},
    customer_state: {type: String, trim: true},
    customer_zip: {type: String, trim: true, minLength: 5},
    customer_email: {type: String, trime: true},
    customer_note: {type: String, trim: true},
    customer_is_active: {type: Boolean},
},{
    timestamps: true
});
module.exports = mongoose.model('Customer', CustomerSchema);