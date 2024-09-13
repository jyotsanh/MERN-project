import React from 'react';
import './LoginAlert.css'; // Create this CSS file

const LoginAlert = ({ message, type }) => {
  return (
    <div className={`alert ${type === 'success' ? 'success' : 'failure'}`}>
      <p>{message}</p>
      <div className="icon">
        {type === 'success' ? (
          <svg xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 0 24 24" width="50" fill="#39e785">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm-2 17.59L5.41 13 4 14.41l6 6L20 8.41 18.59 7 10 15.59z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 0 24 24" width="50" fill="#ff4d4d">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default LoginAlert;
