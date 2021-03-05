const mongoose = require('mongoose');
const LocationSchema = new mongoose.Schema({
    loc_address_1: {type: String, trim: true},
    loc_address_2: {type: String, trim: true},
    loc_city: {type: String, trim: true},
    loc_state: {type: String, trim: true},
    loc_zip: {type: String, trim: true},
    loc_grass: {type: Number},
    loc_mulch: {type: Number},
    loc_fallCleanup: {tpye: Number},
    loc_fertilizer: {type: Number},
    loc_customer: {required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
},{
    timestamps: true
});
module.exports = mongoose.model('Location', LocationSchema);