const mongoose = require('mongoose');
const docuSign_Auth_Schema = new mongoose.Schema({
    auth_key: {type: String, trim: true},
    auth_date: {type: Date}
},{
    timestamps: true
});
module.exports = mongoose.model('DocuSign_Auth', docuSign_Auth_Schema);