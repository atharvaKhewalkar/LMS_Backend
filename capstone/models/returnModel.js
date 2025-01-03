const mongoose = require('mongoose');
const ReturnSchema = new mongoose.Schema({
    username: String,
    bookId: { type: mongoose.ObjectId, ref: 'Book' , unique:true},
    duedate: { type: Date, ref: "BorrowerRecord" },
    fine: { type: Number}
}, { timestamps: true });

module.exports = mongoose.model('Return', ReturnSchema);