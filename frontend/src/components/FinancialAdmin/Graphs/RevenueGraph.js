import React, { useEffect, useState } from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts';
import axios from 'axios';
import { Spin, message } from 'antd';

// Function to map month number to month name
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Array of colors to cycle through for each bar
const barColors = ['#6a99e1', '#2a9d8f', '#6a99e1', '#2a9d8f', '#6a99e1', '#2a9d8f', '#6a99e1', '#2a9d8f', '#6a99e1', '#2a9d8f','#2a9d8f', '#6a99e1'];

const RevenueGraph = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/monthlyrevenue'); // Fetch data from the endpoint
        const transformedData = response.data.map(item => ({
          name: monthNames[item.month_number - 1], // Convert month number to month name
          monthly_revenue: item.monthly_revenue,
          fill: barColors[item.month_number - 1], // Assign color based on month number
        }));
        setData(transformedData); // Update the data state with the transformed data
      } catch (error) {
        console.error(error);
        message.error('Failed to load monthly revenue data');
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, []); // Ensure the effect runs only once on component mount

  if (loading) {
    return <Spin />; // Display loading spinner while fetching data
  }

  return (
    <div className="bar-graph-container">
      <h2 className="graph-title">Monthly Revenue</h2>
      <BarChart
        width={650}
        height={400}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-15} textAnchor="end" interval={0} fontSize={15} dy={-5} dx={20} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="monthly_revenue" />
      </BarChart>
    </div>
  );
};

export default RevenueGraph;
