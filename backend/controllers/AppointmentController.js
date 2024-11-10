const bcrypt = require("bcrypt");
const AppointmentSchemadb = require("../schema/AppointmentSchemadb");

const { v2: cloudinary } = require('cloudinary');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

const AppointmentController = async (req, res) => {
    try {
        console.log("request body : ", req.body);
        const { name, address, phone, prefered_date, prefered_time, location } = req.body;

        // Cloudinary URL of the prescription
        const prescription = req.file ? req.file.path : ''; // Cloudinary URL

        // Create the appointment record
        const data = await AppointmentSchemadb.create({ 
            name, 
            address, 
            phone, 
            prefered_date, 
            prefered_time, 
            location, 
            prescription 
        });

        if (data) {
            return res.status(200).send({ msg: "Data added successfully" });
        } else {
            return res.status(400).send({ msg: "Data schema error" });
        }
    } catch (error) {
        console.error("Error adding appointment:", error);
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

const TestDeleteAppointment = async (req, res) => {
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

const deleteAppointment = async (req, res) => {
    try{
        const { id } = req.params;
        const {bin,prescription} = req.body;
        console.log("prescription : ", prescription);
        const extractPublicId = (url) => {
            const splitUrl = url.split('/');
            
            
            let filename = splitUrl[splitUrl.length - 1];
            
            
            const parts = filename.split(".");
            
            
            filename = parts.slice(0, -1).join(".");
            return filename;
        }

        // Handle image deletions
        if (prescription && prescription.length > 0) {
             
                try {
                    const depublicId = `Prescription/${extractPublicId(prescription)}`;
                    const publicId = decodeURIComponent(depublicId);
                    
                    const result = await cloudinary.uploader.destroy(publicId);
                    
                    if (result.result === 'ok') {
                        console.log(`Successfully deleted image with public ID: ${publicId}`);
                        const appointment = await AppointmentSchemadb.findByIdAndDelete(id);
                        if (appointment) {
                            return res.status(200).send({ msg: "Appointment deleted successfully" });
                        } else {
                            return res.status(400).send({ msg: "Appointment not found" });
                        }
                        
                    } else if (result.result === 'not found') {
                        console.log(`Image with public ID ${publicId} not found in Cloudinary. It may have been already deleted.`);
                        
                    } else {
                        console.log(`Failed to delete image with public ID: ${publicId}. Cloudinary response:`, result);
                    }
                } catch (error) {
                    console.error(`Error deleting image ${imageUrl}:`, error);
                }
                
        }else{
            return res.status(400).send({ msg: "Appointment not found" });
        }
        
    } catch (error) {
        return res.status(400).send({ msg: "Error deleting appointment", error });
    }
}

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
