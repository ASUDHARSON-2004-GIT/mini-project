import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import beepSound from '../assets/beep.mp3'; // Adjust path if needed

const beep = new Audio(beepSound);

const Dashboard = () => {
  const [status, setStatus] = useState("Checking...");
  const [trafficData, setTrafficData] = useState([]);
  const [latestPacketRate, setLatestPacketRate] = useState(0);
  const [counter, setCounter] = useState(0);
  const [alertLogs, setAlertLogs] = useState([]);

  useEffect(() => {
    const fetchTraffic = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/traffic");

        const newRate = res.data.data.packet_rate;
        const newStatus = newRate > 5000 ? "DoS Attack Detected!" : "Normal Traffic";

        if (newStatus === "DoS Attack Detected!" && status !== "DoS Attack Detected!") {
          beep.currentTime = 0;
          beep.play().catch(err => console.log("Audio play error:", err));
          const timestamp = new Date().toLocaleTimeString();
          setAlertLogs(prev => [...prev.slice(-9), `Attack detected at ${timestamp}`]);
        }

        setStatus(newStatus);
        setLatestPacketRate(newRate);

        setTrafficData(prevData => {
          const newEntry = {
            time: counter,
            packet_rate: newRate
          };
          setCounter(counter + 1);
          return [...prevData.slice(-19), newEntry];
        });

      } catch (err) {
        setStatus("Backend Not Connected");
      }
    };

    fetchTraffic();
    const interval = setInterval(fetchTraffic, 3000);
    return () => clearInterval(interval);
  }, [counter, status]);

  return (
    <div style={styles.dashboard}>
      {/* ALERT BANNER */}
      <div style={{
        ...styles.alertBox,
        backgroundColor: status.includes("Attack") ? "#ff0000" :
                         status === "Normal Traffic" ? "#003300" : "#333",
        color: "white"
      }}>
        {status}
      </div>

      {/* LIVE PACKET COUNT */}
      <div style={styles.packetCountBox}>
        <h3>Current Packet Rate:</h3>
        <p style={styles.packetValue}>{latestPacketRate} packets/sec</p>
      </div>

      {/* GRAPH */}
      <div style={{ height: '350px', marginTop: '2rem' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trafficData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="packet_rate" stroke="#00eaff" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ALERT LOG HISTORY */}
      <div style={styles.logContainer}>
        <h3>Alert Log History</h3>
        <ul style={styles.logList}>
          {alertLogs.length === 0 ? (
            <li style={{ color: '#888' }}>No attacks yet</li>
          ) : (
            alertLogs.map((log, index) => <li key={index}>{log}</li>)
          )}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  dashboard: {
    padding: '2rem',
    backgroundColor: '#0a0a0a',
    minHeight: '100vh',
    color: 'white',
  },
  alertBox: {
    padding: '1rem',
    borderRadius: '8px',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '1.2rem',
    marginBottom: '2rem',
  },
  packetCountBox: {
    backgroundColor: '#1f1f1f',
    borderRadius: '10px',
    padding: '1.2rem',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  packetValue: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#00ffcc',
    marginTop: '0.5rem'
  },
  logContainer: {
    backgroundColor: '#1a1a1a',
    padding: '1rem',
    borderRadius: '10px',
    marginTop: '2rem',
    color: '#ff4d4d'
  },
  logList: {
    listStyleType: 'none',
    paddingLeft: 0,
    marginTop: '0.5rem',
    fontSize: '0.95rem',
    lineHeight: '1.5rem'
  }
};

export default Dashboard;