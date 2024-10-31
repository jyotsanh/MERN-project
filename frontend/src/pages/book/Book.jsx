import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import { useNavigate } from 'react-router-dom';
import './Book.css';
import { setAppointments } from '../../service/api';

function Book() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [location, setLocation] = useState('');
  const [error, setError] = useState({});
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setMessage('');
    setIsSubmitted(false);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    formData.append('phone', phone);
    formData.append('prefered_date', selectedDate);
    formData.append('prefered_time', selectedTime);
    formData.append('location', location);
    formData.append("prescription", image);

    try {
      const response = await setAppointments(formData);
      setMessage(response.msg);
      setError({});
      setImage(null);
      setIsSubmitted(true);
      setShowAlert(true);
      
      setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Hide alert after 3 seconds

      navigate('/');
    } catch (error) {
      const { name, address, phone, prefered_date, prefered_time, location } = error.response.data;
      setError({ name: name, address: address, phone: phone, date: prefered_date, time: prefered_time, location: location });
      setIsSubmitted(false);
    }
  };

  return (
    <div className='book-box'>
      {showAlert && (
        <div className='success-alert'>
          Appointment booked successfully!
        </div>
      )}
      <h1 className='book-h1'>Appointment Booking</h1>
      <div className="booking">
        <form className="book-appointment" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            value={name} 
            onChange={(e) => setName(e.target.value)}
          />
          {error.name && <p className="error-text">{error.name}</p>}

          <label htmlFor="address">Address:</label>
          <input 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text" 
            id="address" 
            name="address" 
            required 
          />
          {error.address && <p className="error-text">{error.address}</p>}

          <label htmlFor="image">Upload prescription:</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />

          <label htmlFor="phone">Phone Number:</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            required 
            pattern="[0-9]*" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {error.phone && <p className="error-text">{error.phone}</p>}

          <label htmlFor="date">Preferred Date:</label>
          <DatePicker
            id="date"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            required
          />
          {error.date && <p className="error-text">{error.date}</p>}

          <label htmlFor="time">Preferred Time:</label>
          <div className="book-time-picker-container">
            <TimePicker
              id="time"
              value={selectedTime}
              onChange={(time) => setSelectedTime(time)}
              disableClock={true}
              required
            />
          </div>
        
          {error.time && <p className="error-text">{error.time}</p>}

          <label htmlFor="location">Location:</label>
          <select 
            id="location" 
            name="location" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            required
          >
            <option value="">Select Location</option>
            <option value="Boudha">Boudha</option>
            <option value="Baneshwor">Baneshwor</option>
            <option value="Lalitpur">Lalitpur</option>
          </select>
          {error.location && <p className="error-text">{error.location}</p>}

          <input type="submit" value="Submit" />
          {message && <p>{message}</p>}
          {error.msg && <p className="error-text">{error.msg}</p>}
          {isSubmitted && <p className="success-text">Form submitted successfully!</p>}
        </form>
      </div>
    </div>
  );
}

export default Book;
