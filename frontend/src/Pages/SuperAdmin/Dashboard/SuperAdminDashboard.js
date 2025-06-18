import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Button, Dropdown, Menu, Typography } from 'antd';
import { DownOutlined, UserOutlined, FileOutlined, TeamOutlined, BankOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;

const DashboardCard = ({ number, text, color, icon }) => (
  <Card 
    hoverable
    style={{ 
      backgroundColor: color, 
      color: 'white', 
      borderRadius: '12px', 
      marginBottom: '20px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      transition: 'all 0.3s'
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{number}</div>
        <div style={{ fontSize: '16px' }}>{text}</div>
      </div>
      <div style={{ fontSize: '48px', opacity: 0.8 }}>{icon}</div>
    </div>
  </Card>
);

const SuperAdminDashboard = () => {
  const [jobSeekerCount, setJobSeekerCount] = useState(0);
  const [jobPosterCount, setJobPosterCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  const [adminData, setAdminData] = useState([]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [jobSeekerResponse, jobPosterResponse, adminResponse, jobResponse, adminListResponse] = await Promise.all([
          axios.get('http://localhost:8000/approved-jobseekers-count'),
          axios.get('http://localhost:8000/approved-jobposters-count'),
          axios.get('http://localhost:8000/get-admin-count'),
          axios.get('http://localhost:8000/get-job-count'),
          axios.get('http://localhost:8000/get-admin-list')
        ]);
        setJobSeekerCount(jobSeekerResponse.data.activeAccountCount);
        setJobPosterCount(jobPosterResponse.data.activeJPAccountCount);
        setAdminCount(adminResponse.data.adminCount);
        setJobCount(jobResponse.data.jobCount);
        setAdminData(adminListResponse.data);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  const handleStatusChange = async (record, newStatus) => {
    console.log(`Changing status of ${record.FirstName} ${record.LastName} to ${newStatus}`);
    
    try {
      const response = await axios.put('http://localhost:8000/update-admin-status', {
        status: newStatus,
        email: record.Email
      });
      
      if (response.status === 200) {
        const updatedAdminData = adminData.map(admin => {
          if (admin.Email === record.Email) {
            return { ...admin, status: newStatus };
          }
          return admin;
        });
        setAdminData(updatedAdminData);
        console.log('Admin status updated successfully!');
      } else {
        console.error('Failed to update admin status:', response.data);
      }
    } catch (error) {
      console.error('Error updating admin status:', error);
    }
  };

  const statusColors = {
    Active: '#52c41a',
    Suspend: '#f5222d',
    Hold: '#1890ff'
  };

  const columns = [
    { 
      title: 'Admin Name', 
      dataIndex: 'AdminName', 
      key: 'AdminName', 
      render: (text, record) => `${record.FirstName} ${record.LastName}`
    },
    { title: 'Email', dataIndex: 'Email', key: 'Email' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status) => (
        <span style={{ 
          color: statusColors[status] || '#faad14',
          fontWeight: 'bold',
          padding: '4px 8px',
          borderRadius: '4px',
          backgroundColor: `${statusColors[status]}22` // 22 is for 13% opacity
        }}>
          {status}
        </span>
      )
    },
    { title: 'AdminRole', dataIndex: 'AdminRole', key: 'AdminRole' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1" onClick={() => handleStatusChange(record, 'Active')}>
                <span style={{ color: statusColors.Active }}>Active</span>
              </Menu.Item>
              <Menu.Item key="2" onClick={() => handleStatusChange(record, 'Suspend')}>
                <span style={{ color: statusColors.Suspend }}>Suspend</span>
              </Menu.Item>
              <Menu.Item key="3" onClick={() => handleStatusChange(record, 'Hold')}>
                <span style={{ color: statusColors.Hold }}>Hold</span>
              </Menu.Item>
            </Menu>
          }
        >
          <Button style={{ borderRadius: '6px' }}>
            Actions <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <div style={{ padding: '30px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2} style={{ marginBottom: '24px', color: '#1890ff' }}>Super Admin Dashboard</Title>
      <Row gutter={24}>
        <Col span={6}><DashboardCard number={adminCount} text="Admin Count" color="#5cdbd3" icon={<UserOutlined />} /></Col>
        <Col span={6}><DashboardCard number={jobPosterCount} text="Job Poster Count" color="#b37feb" icon={<BankOutlined />} /></Col>
        <Col span={6}><DashboardCard number={jobSeekerCount} text="Job Seeker Count" color="#69c0ff" icon={<TeamOutlined />} /></Col>
        <Col span={6}><DashboardCard number={jobCount} text="Job Count" color="#ffa940" icon={<FileOutlined />} /></Col>
      </Row>
      <Card 
        title={<Title level={4}>Admin List</Title>} 
        style={{ 
          marginTop: '30px', 
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}
      >
        <Table 
          columns={columns} 
          dataSource={adminData}
          pagination={{ pageSize: 5 }}
          rowKey="Email"
          style={{ overflowX: 'auto' }}
        />
      </Card>
    </div>
  );
};

export default SuperAdminDashboard;