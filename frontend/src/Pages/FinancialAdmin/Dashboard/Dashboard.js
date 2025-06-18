import React, { useEffect, useState } from 'react';
import { DollarOutlined } from '@ant-design/icons';
import { Typography, Card, Space, Statistic, Spin, message,  } from 'antd';
import BarGraph from '../../../components/FinancialAdmin/Graphs/TestGraph';
import axios from 'axios';
import RevenueGraph from '../../../components/FinancialAdmin/Graphs/RevenueGraph';

const { Title } = Typography;

const gradientStyles = {
  todayIncome: {
    background: 'linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%)',
  },
  monthIncome: {
    background: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
  },
  yearIncome: {
    background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
  },
  todayRevenue: {
    background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
  },
  monthRevenue: {
    background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  },
  yearRevenue: {
    background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  },
};

const dashboardStyles = {
  pageContent: {
    padding: '20px',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '30px',
  },
  card: {
    width: '300px',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease-in-out',
    ':hover': {
      transform: 'translateY(-5px)',
    },
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  icon: {
    fontSize: '40px',
    padding: '10px',
    borderRadius: '50%',
    marginRight: '15px',
  },
  graphContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
};

function Dashboard() {
  const [incomeData, setIncomeData] = useState(null);
  const [revenueData, setRevenueData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:8000/groupedincome')
      .then((response) => {
        setIncomeData(response.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        message.error('Error fetching income data');
        console.error(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8000/groupedrevenue')
      .then((response) => {
        setRevenueData(response.data[0]);
      })
      .catch((error) => {
        message.error('Error fetching revenue data');
        console.error(error);
      });
  }, []);

  if (loading || !incomeData || !revenueData) {
    return <Spin size="large" tip="Loading..." />;
  }

  return (
    <div style={dashboardStyles.pageContent}>
      <Title level={2} style={{ marginBottom: '24px', color: '#1890ff' }}>Financial Admin Dashboard</Title>
      <div style={dashboardStyles.cardsContainer}>
        {[
          { title: 'Today Income', data: incomeData.total_today, style: gradientStyles.todayIncome, iconColor: 'green' },
          { title: 'This Month Income', data: incomeData.total_month, style: gradientStyles.monthIncome, iconColor: 'blue' },
          { title: 'This Year Income', data: incomeData.total_year, style: gradientStyles.yearIncome, iconColor: 'red' },
          { title: 'Today Revenue', data: revenueData.total_today, style: gradientStyles.todayRevenue, iconColor: 'green' },
          { title: 'This Month Revenue', data: revenueData.total_month, style: gradientStyles.monthRevenue, iconColor: 'blue' },
          { title: 'This Year Revenue', data: revenueData.total_year, style: gradientStyles.yearRevenue, iconColor: 'red' },
        ].map((item, index) => (
          <Card key={index} style={{ ...dashboardStyles.card, ...item.style }}>
            <p style={dashboardStyles.cardTitle}>{item.title}</p>
            <Space>
              <DollarOutlined style={{ ...dashboardStyles.icon, color: item.iconColor, backgroundColor: `rgba(${item.iconColor === 'green' ? '0,255,0' : item.iconColor === 'blue' ? '0,0,255' : '255,0,0'},0.25)` }} />
              <Statistic value={item.data} />
            </Space>
          </Card>
        ))}
      </div>
      <div style={dashboardStyles.graphContainer}>
        <BarGraph />
        <RevenueGraph />
      </div>
    </div>
  );
}

export default Dashboard;