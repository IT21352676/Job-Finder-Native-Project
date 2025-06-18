import React, { useEffect, useState } from 'react';
import { TeamOutlined, UserOutlined, FileDoneOutlined } from '@ant-design/icons';
import { Typography, Card, Space, Statistic, Spin, message } from 'antd';
import axios from 'axios';
import StatusChart from '../../../components/ProfileAdmin/Chart/Chart';
import PieChart from '../../../components/ProfileAdmin/Circle/Circle';

const { Title } = Typography;

const gradientStyles = {
  activeMembers: {
    background: 'linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%)',
  },
  profileRequests: {
    background: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
  },
  jobHandlingRequests: {
    background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
  },
};

function Dashboard() {
  const [activeMembers, setActiveMembers] = useState(0);
  const [profileRequests, setProfileRequests] = useState(0);
  const [jobHandlingRequests, setJobHandlingRequests] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveMembers = async () => {
      try {
        const [jobSeekersResponse, jobPostersResponse] = await Promise.all([
          axios.get('http://localhost:8000/approved-jobseekers-count'),
          axios.get('http://localhost:8000/approved-jobposters-count'),
        ]);
        const jobSeekersCount = jobSeekersResponse.data.activeAccountCount;
        const jobPostersCount = jobPostersResponse.data.activeJPAccountCount;
        setActiveMembers(jobSeekersCount + jobPostersCount);
      } catch (error) {
        message.error('Error fetching active members data');
        console.error(error);
      }
    };

    const fetchProfileRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8000/totalrequestCount');
        setProfileRequests(response.data.totalrequestCount);
      } catch (error) {
        message.error('Error fetching profile requests data');
        console.error(error);
      }
    };

    const fetchJobHandlingRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8000/jobhandlingrequest');
        setJobHandlingRequests(response.data.JobHandlingRequest);
      } catch (error) {
        message.error('Error fetching job handling requests data');
        console.error(error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchActiveMembers(), fetchProfileRequests(), fetchJobHandlingRequests()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spin tip="Loading..." style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />;
  }


  return (
    <div className="PageContent" style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
      <Title level={2} style={{ marginBottom: '24px', color: '#1890ff' }}>Profile and Job Handling Admin Dashboard</Title>
      <div className="flex items-center justify-center">
        <div className="Cards" style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
          <Space direction="horizontal" style={{ margin: '5%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Card style={{ ...gradientStyles.activeMembers, borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', flex: '1 1 300px', margin: '10px' }}>
              <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Active Members</p>
              <Space>
                <TeamOutlined
                  style={{
                    color: 'green',
                    fontSize: '50px',
                    backgroundColor: 'rgba(0,255,0,0.25)',
                    borderRadius: '50%',
                    padding: '15px',
                    marginRight: '20px'
                  }}
                />
                <Statistic title="Active Members" value={activeMembers} valueStyle={{ fontSize: '24px', fontWeight: 'bold' }} />
              </Space>
            </Card>

            <Card style={{ ...gradientStyles.profileRequests, borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', flex: '1 1 300px', margin: '10px' }}>
              <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Profile Requests</p>
              <Space>
                <UserOutlined
                  style={{
                    color: 'blue',
                    fontSize: '50px',
                    backgroundColor: 'rgba(0,0,255,0.25)',
                    borderRadius: '50%',
                    padding: '15px',
                    marginRight: '20px'
                  }}
                />
                <Statistic title="Profile Requests" value={profileRequests} valueStyle={{ fontSize: '24px', fontWeight: 'bold' }} />
              </Space>
            </Card>

            <Card style={{ ...gradientStyles.jobHandlingRequests, borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', flex: '1 1 300px', margin: '10px' }}>
              <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Job Handling Requests</p>
              <Space>
                <FileDoneOutlined
                  style={{
                    color: 'red',
                    fontSize: '50px',
                    backgroundColor: 'rgba(255,0,0,0.25)',
                    borderRadius: '50%',
                    padding: '15px',
                    marginRight: '20px'
                  }}
                />
                <Statistic title="Job Handling Requests" value={jobHandlingRequests} valueStyle={{ fontSize: '24px', fontWeight: 'bold' }} />
              </Space>
            </Card>
          </Space>
        </div>
      </div>

      <div className="Charts" style={{ display: 'flex', justifyContent: 'space-around', margin: '40px 0', flexWrap: 'wrap' }}>
        <div style={{ width: '35%', minWidth: '300px', marginBottom: '20px', backgroundColor: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <StatusChart /> 
        </div>
        <div style={{ width: '35%', minWidth: '300px', marginBottom: '20px', backgroundColor: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <PieChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;