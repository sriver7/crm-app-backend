const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const quote_Schema = new mongoose.Schema({
    quote_status: {type: Number, trim: true},
    quote_customer: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    }
},{
    timestamps: true,
});
module.exports = mongoose.model('Quote', quote_Schema);