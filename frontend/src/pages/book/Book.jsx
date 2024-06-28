import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import './Book.css';

function Book() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('08:00');
  const [location, setLocation] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Name:', e.target.name.value);
    console.log('Address:', e.target.address.value);
    console.log('Phone Number:', e.target.phone.value);
    console.log('Date:', selectedDate);
    console.log('Time:', selectedTime);
    console.log('Location:', location);
    alert('Successfully Submitted!');
  };

  return (
    <div>
      <h1 className='book-h1'>Appointment Booking</h1>
      <form className="book-appointment" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" required />
        <label htmlFor="phone">Phone Number:</label>
        <input type="tel" id="phone" name="phone" required pattern="[0-9]*" />
        <label htmlFor="date">Preferred Date:</label>
        <DatePicker
          id="date"
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
          required
        />
        <label htmlFor="time">Preferred Time:</label>
        <div className="book-time-picker-container">
          <TimePicker
            id="time"
            value={selectedTime}
            onChange={handleTimeChange}
            disableClock={true}
            required
          />
        </div>
        <label htmlFor="location">Location:</label>
        <select id="location" name="location" value={location} onChange={handleLocationChange} required>
          <option value="">Select Location</option>
          <option value="Boudha">Boudha</option>
          <option value="Baneshwor">Baneshwor</option>
          <option value="Lalitpur">Lalitpur</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Book;
