import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
    }],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobPostersResponse, jobSeekersResponse] = await Promise.all([
          axios.get('http://localhost:8000/approved-jobposters-count'),
          axios.get('http://localhost:8000/approved-jobseekers-count')
        ]);

        const jobPostersCount = jobPostersResponse.data.activeJPAccountCount;
        const jobSeekersCount = jobSeekersResponse.data.activeAccountCount;

        setChartData({
          labels: ['Job Posters', 'Job Seekers'],
          datasets: [{
            data: [jobPostersCount, jobSeekersCount],
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          }],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Approved Job Posters vs Job Seekers',
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;