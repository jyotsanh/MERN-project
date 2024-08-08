const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    prescription:{
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    prefered_date: {
        type: Date,
        required: true
    },
    prefered_time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['uncomplete', 'ongoing', 'completed'],
        default: 'uncomplete'
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
AppointmentSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Pre-findOneAndUpdate middleware to update the updatedAt field
AppointmentSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updatedAt: Date.now() });
    next();
});

const AppointmentSchemadb = mongoose.model("Appointment", AppointmentSchema);

module.exports = AppointmentSchemadb;
