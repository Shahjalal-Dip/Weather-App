import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Weather App. All rights reserved.</p>
      <p>Powered by OpenWeatherMap API</p>
    </footer>
  );
};

export default Footer;