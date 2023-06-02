const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        required: true
    },
    created_by: {
        type: String,
        required: true,
    },
    soft_delete: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Item", itemSchema)
