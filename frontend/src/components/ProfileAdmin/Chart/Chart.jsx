import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './Chart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatusChart = () => {
  const [data, setData] = useState({
    labels: ['Job Posters', 'Job Seekers'],
    datasets: [
      {
        label: 'Active',
        backgroundColor: 'rgba(75,192,192,0.6)',
        data: [],
      },
      {
        label: 'Declined',
        backgroundColor: 'rgba(255,99,132,0.6)',
        data: [],
      },
    ],
  });

  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jpApprovedRes, jpDeclinedRes, jsApprovedRes, jsDeclinedRes] = await Promise.all([
          axios.get('http://localhost:8000/approved-jobposters-count'),
          axios.get('http://localhost:8000/declined-jobposters-count'),
          axios.get('http://localhost:8000/approved-jobseekers-count'),
          axios.get('http://localhost:8000/declined-jobseekers-count'),
        ]);

        setData({
          labels: ['Job Posters', 'Job Seekers'],
          datasets: [
            {
              label: 'Active',
              backgroundColor: 'rgba(75,192,192,0.6)',
              data: [jpApprovedRes.data.activeJPAccountCount, jsApprovedRes.data.activeAccountCount],
            },
            {
              label: 'Declined',
              backgroundColor: 'rgba(255,99,132,0.6)',
              data: [jpDeclinedRes.data.declinedJPAccountCount, jsDeclinedRes.data.declinedJSAccountCount],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="status-chart-container">
      <h2 className="status-chart-title">Job Poster and Job Seeker Status</h2>
      <div className="status-chart">
        <Bar
          ref={chartRef}
          data={data}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default StatusChart;
