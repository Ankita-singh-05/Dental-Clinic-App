import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewAppointments = () => {
const { userId } = useParams();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`/api/v1/appointments/${userId}`);
        if (res.data.success) {
          setAppointments(res.data.data);
        } else {
          // Handle unsuccessful response
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchAppointments();
  }, [userId]);


  return (
    <div>
      <h1>My Appointments</h1>
      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id}>
              <p>Doctor Name: {appointment.doctorInfo}</p>
              <p>Date: {appointment.date}</p>
              <p>Time: {appointment.time}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewAppointments;
