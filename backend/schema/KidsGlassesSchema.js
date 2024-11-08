const mongoose = require("mongoose");

const KidsGlassesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: [{
        type: String,
        required: true
    }],
    frame_material: {
        type: String,
        required: true
    },
    lens_material: {
        type: String,
        required: true
    },
    frame_shape: {
        type: String,
        required: true
    },
    imageUrls: [{
        type: String,
        required: true
    }],
    quantity: {
        type: Number,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save middleware to update the updatedAt field
KidsGlassesSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const KidsGlassesSchemadb = mongoose.model("KidsGlasses", KidsGlassesSchema);

module.exports = KidsGlassesSchemadb;
