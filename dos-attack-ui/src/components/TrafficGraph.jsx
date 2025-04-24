import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const TrafficGraph = ({ data }) => {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Real-Time Traffic</h2>
      <LineChart width={700} height={300} data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#00ffcc" strokeWidth={2} />
      </LineChart>
    </div>
  );
};

export default TrafficGraph;
