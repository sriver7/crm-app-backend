const mongoose = require('mongoose');
const InvoiceSchema = new mongoose.Schema({
    invoice_date: {type: Date},
    invoice_amount: {type: Number, trim: true},
    invoice_customer: {
        required: true, 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    }

},{
    timestamps: true
});
module.exports = mongoose.model('Invoice', InvoiceSchema);