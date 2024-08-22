const bcrypt = require("bcrypt");
const AppointmentSchemadb = require("../schema/AppointmentSchemadb");

const AppointmentController = async (req, res) => {
    try {
        console.log("request body : ", req.body);
        const { name, address, phone, prefered_date, prefered_time, location } = req.body;
        const prescription = `uploads/Prescription/${name}/${req.file.filename}`;
        const data = await AppointmentSchemadb.create({ name, address, phone, prefered_date, prefered_time, location, prescription });

        if (data) {
            return res.status(200).send({ msg: "Data added successfully" });
        } else {
            return res.status(400).send({ msg: "Data schema error" });
        }
    } catch (error) {
        return res.status(400).send({ msg: "Server Error", error });
    }
};

const updateAppointmentStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        const appointment = await AppointmentSchemadb.findByIdAndUpdate(id, { status }, { new: true });
        if (appointment) {
            return res.status(200).send({ msg: "Status updated successfully", appointment });
        } else {
            return res.status(400).send({ msg: "Appointment not found" });
        }
    } catch (error) {
        return res.status(400).send({ msg: "Error updating status", error });
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await AppointmentSchemadb.findByIdAndDelete(id);
        if (appointment) {
            return res.status(200).send({ msg: "Appointment deleted successfully" });
        } else {
            return res.status(400).send({ msg: "Appointment not found" });
        }
    } catch (error) {
        return res.status(400).send({ msg: "Error deleting appointment", error });
    }
};

const Appointments = async (req, res) => {
    const data = await AppointmentSchemadb.find();
    if (data) {
        return res.status(200).send(data);
    } else {
        return res.status(400).send({ msg: "Data schema not found" });
    }
};

module.exports = {
    AppointmentController,
    updateAppointmentStatus,
    deleteAppointment,
    Appointments
};
