import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

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
        <div>
            <h1>Appointment View</h1>
            <br />
            <br />
            <NavLink to="/admin">
                <button>Back to Admin</button>
            </NavLink>
            <div>
                {Appointments.length === 0 ? (
                    <p>No Appointments available</p>
                ) : (
                    <ul>
                        {Appointments.map(Appointments => (
                            <li key={Appointments._id}>

                            <img src={`${Appointments.prescription}`} alt={Appointments.name} width="100" />
                            <h2>{Appointments.name}</h2>
                            <p>Address: {Appointments.address}</p>
                            <p>Phone: {Appointments.phone}</p>
                            <p>Prefered Date: {Appointments.prefered_date}</p>
                            <p>Prefered Time: {Appointments.prefered_time}</p>
                            <p>Location: {Appointments.location}</p>

                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
        
    );
}

export default AppointmentView;