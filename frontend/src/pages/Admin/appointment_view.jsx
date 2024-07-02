import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './appointment_view.css'

import {getAppointments} from "../../service/api";

function AppointmentView() {
    const [Appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ApppointmentsData = await getAppointments();
                console.log("productsData", ApppointmentsData);
                setAppointments(ApppointmentsData);
            } catch (error) {
                setAppointments([]);
                console.error('Error fetching Appointments:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="appointment-view-container">
        <h1>Appointment View</h1>
        <br />
        <br />
        <NavLink to="/admin">
            <button className="back-button">Back to Admin</button>
        </NavLink>
        <div className="appointments-list">
            {Appointments.length === 0 ? (
                <p>No Appointments available</p>
            ) : (
                <ul>
                        {Appointments.map(appointment => (
                            <li key={appointment._id} className="appointment-item">
                                <img src={`${appointment.prescription}`} alt={appointment.name} width="100" className="appointment-img" />
                                <h2 className="appointment-name">{appointment.name}</h2>
                                <p>Address: {appointment.address}</p>
                                <p>Phone: {appointment.phone}</p>
                                <p>Preferred Date: {appointment.prefered_date}</p>
                                <p>Preferred Time: {appointment.prefered_time}</p>
                                <p>Location: {appointment.location}</p>
                            </li>
                        ))}
                    </ul>
            )}
        </div>
    </div>
        
    );
}

export default AppointmentView;