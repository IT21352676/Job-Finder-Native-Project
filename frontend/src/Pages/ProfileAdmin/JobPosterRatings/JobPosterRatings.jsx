import React, { useState, useEffect } from 'react';
import { Table, Rate } from 'antd';
import axios from 'axios';

const JobPosterRatings = () => {
  const [data, setData] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/job-poster-avg-ratings');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'FirstName',
      key: 'FirstName',
      sorter: (a, b) => a.FirstName.localeCompare(b.FirstName),
      sortOrder: sortedInfo.columnKey === 'FirstName' && sortedInfo.order,
    },
    {
      title: 'Last Name',
      dataIndex: 'LastName',
      key: 'LastName',
      sorter: (a, b) => a.LastName.localeCompare(b.LastName),
      sortOrder: sortedInfo.columnKey === 'LastName' && sortedInfo.order,
    },
    {
      title: 'Email Address',
      dataIndex: 'EmailAddress',
      key: 'EmailAddress',
      sorter: (a, b) => a.EmailAddress.localeCompare(b.EmailAddress),
      sortOrder: sortedInfo.columnKey === 'EmailAddress' && sortedInfo.order,
    },
    {
      title: 'Average Rating',
      dataIndex: 'average_rating',
      key: 'average_rating',
      sorter: (a, b) => parseFloat(a.average_rating) - parseFloat(b.average_rating),
      sortOrder: sortedInfo.columnKey === 'average_rating' && sortedInfo.order,
      render: (rating) => {
        const value = parseFloat(rating);
        return (
          <>
            {sortedInfo.order ? (
              <Rate disabled allowHalf defaultValue={value} value={value} />
            ) : (
              <Rate disabled allowHalf defaultValue={value} />
            )}
            <span style={{ marginLeft: '5px' }}>{value.toFixed(1)}</span>
          </>
        );
      },
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
        }}>Job Poster Ratings</h1>
        <Table
          columns={columns}
          dataSource={data}
          onChange={handleChange}
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
          rowKey="EmailAddress"
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

export default JobPosterRatings;