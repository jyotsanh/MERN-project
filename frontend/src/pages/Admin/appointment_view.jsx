import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './appointment_view.css';

import { getAppointments, updateAppointmentStatus, deleteAppointment } from '../../service/api';

function AppointmentView() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const appointmentsData = await getAppointments();
                console.log("appointmentsData", appointmentsData);
                setAppointments(appointmentsData);
            } catch (error) {
                setAppointments([]);
                console.error('Error fetching appointments:', error);
            }
        };

        fetchData();
    }, []);

    const handleStatusChange = async (id, status) => {
        try {
            const updatedAppointment = await updateAppointmentStatus(id, status);
            setAppointments(appointments.map(app => app._id === id ? updatedAppointment : app));
        } catch (error) {
            console.error('Error updating appointment status:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteAppointment(id);
            setAppointments(appointments.filter(app => app._id !== id));
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    };

    return (
        <div className="appointment-view-container">
            <h1>Appointment View</h1>
            <br />
            <br />
            <NavLink to="/admin">
                <button className="back-button">Back to Admin</button>
            </NavLink>
            <div className="appointments-list">
                {appointments.length === 0 ? (
                    <p>No appointments available</p>
                ) : (
                    <ul>
                        {appointments.map(appointment => (
                            <li key={appointment._id} className="appointment-item">
                                <img src={`${appointment.prescription}`} alt={appointment.name} width="100" className="appointment-img" />
                                <h2 className="appointment-name">{appointment.name}</h2>
                                <p>Address: {appointment.address}</p>
                                <p>Phone: {appointment.phone}</p>
                                <p>Preferred Date: {appointment.prefered_date}</p>
                                <p>Preferred Time: {appointment.prefered_time}</p>
                                <p>Location: {appointment.location}</p>
                                <p>Status: {appointment.status}</p>
                                <select
                                    value={appointment.status}
                                    onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
                                >
                                    <option value="uncomplete">Uncomplete</option>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="completed">Completed</option>
                                </select>
                                <button onClick={() => handleDelete(appointment._id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default AppointmentView;
