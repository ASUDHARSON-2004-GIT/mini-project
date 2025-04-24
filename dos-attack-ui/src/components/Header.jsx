import React from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header style={styles.header}>
      <img src={logo} alt="Logo" style={styles.logo} />
      <h1 style={styles.title}>DoS Attack Detection System</h1>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#0565d3',
  },
  logo: {
    height: '50px',
    marginRight: '1rem',
    borderRadius: '8px',
  
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
  },
};

export default Header;