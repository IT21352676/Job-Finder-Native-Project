import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import axios from 'axios';

const JobCancelRequests = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/job-cancel-requests')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        message.error('Error fetching data');
      });
  }, []);

  const handleApprove = (id) => {
    axios.put('http://localhost:8000/approve-job-cancel-request', { id })
      .then(() => {
        message.success('Request approved');
        setData(data.filter(item => item.id !== id));
      })
      .catch(error => {
        message.error('Error approving request');
      });
  };

  const handleReject = (id) => {
    axios.delete('http://localhost:8000/reject-job-cancel-request', { data: { id } })
      .then(() => {
        message.success('Request rejected');
        setData(data.filter(item => item.id !== id));
      })
      .catch(error => {
        message.error('Error rejecting request');
      });
  };

  const columns = [
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'no',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Seeker',
      dataIndex: 'seeker',
      key: 'seeker',
    },
    {
      title: 'Job ID',
      dataIndex: 'jobId',
      key: 'jobId',
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Approved',
      dataIndex: 'approved',
      key: 'approved',
      render: (approved) => (approved ? 'Yes' : 'No'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => handleApprove(record.id)} style={{ marginRight: 8 }}>
            Approve
          </Button>
          <Button type="danger" onClick={() => handleReject(record.id)}>
            Reject
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ 
      backgroundColor: '#f0f2f5', 
      minHeight: '100vh', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '20px'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#1890ff',
          fontSize: '28px',
          marginBottom: '20px',
          borderBottom: '2px solid #1890ff',
          paddingBottom: '10px'
        }}>Job Cancel Requests</h1>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ 
            pageSize: 10, 
            showSizeChanger: true, 
            showQuickJumper: true,
            style: { marginTop: '20px' }
          }}
          style={{
            width: '100%',
            overflowX: 'auto'
          }}
          rowKey="id"
          rowClassName={(record, index) => index % 2 === 0 ? 'even-row' : 'odd-row'}
        />
      </div>
      <style>{`
        .even-row { background-color: #fafafa; }
        .odd-row { background-color: #ffffff; }
        .ant-table-thead > tr > th {
          background-color: #1890ff;
          color: white;
        }
        .ant-table-tbody > tr:hover > td {
          background-color: #e6f7ff;
        }
      `}</style>
    </div>
  );
};

export default JobCancelRequests;
