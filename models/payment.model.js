const mongoose = require('mongoose');
const PaymentSchema = new mongoose.Schema({
    payment_date: {type: Date},
    payment_amount: {type: Number, trim: true},
    payment_check_num: {type: String, trim: true},
    payment_customer: {
        required: true, 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    }
},{
    timestamps: true
});
module.exports = mongoose.model('Payment', PaymentSchema)