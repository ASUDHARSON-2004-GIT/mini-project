import React from 'react';
import bg from '../assets/cyber-bg.jpg';

const StartPage = ({ onStart }) => {
  return (
    <div style={{ ...styles.container, backgroundImage: `url(${bg})` }}>
      <div style={styles.content}>
        <button onClick={onStart} style={styles.button}>Start Monitoring</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: 'calc(100vh - 80px)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    textAlign: 'center',
  },
  button: {
    padding: '1rem 2rem',
    fontSize: '1.2rem',
    backgroundColor: '#00ffcc',
    color: '#000',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: '0.3s',
  },
};

export default StartPage;