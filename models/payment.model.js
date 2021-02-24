const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const payment_Schema = new mongoose.Schema({
    payment_date: {type: Date},
    payment_amount: {type: Number, trim: true},
    payment_check_num: {type: String, trim: true},
    payment_customer: {
        required: true, 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    }
},{
    timestamps: true,
});
module.exports = mongoose.model('Payment', payment_Schema);