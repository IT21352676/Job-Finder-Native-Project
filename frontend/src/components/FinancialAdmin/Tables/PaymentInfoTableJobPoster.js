import React, { useEffect, useState } from 'react';
import { Table, Spin, message, Button } from 'antd';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Define the columns for the table
const columns = [
  {
    title: 'Job Poster',
    dataIndex: 'job_poster',
    key: 'job_poster',
    render: (text, record) => (
      <a href={`/jobPoster/${record.job_poster}`}>{text}</a>
    ),
  },
  {
    title: 'Poster Name',
    dataIndex: 'posterName',
    key: 'posterName',
  },
  {
    title: 'Payment Date',
    dataIndex: 'payment_date',
    key: 'payment_date',
    render: (date) => new Date(date).toLocaleDateString(),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Payment ID',
    dataIndex: 'payment_id',
    key: 'payment_id',
    render: (text) => (
      <a href={`http://localhost:3000/Payments/${text}`}>{text}</a>
    ),
  },
];

const PaymentInfoTableJobPoster = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/paymentdata');
        setData(response.data);
      } catch (error) {
        message.error('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Payment Information From Job Posters", 14, 16);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 22);

    const tableData = data.map((item, index) => [
      index + 1,
      item.job_poster,
      item.posterName,
      new Date(item.payment_date).toLocaleDateString(),
      item.amount,
      item.payment_id,
    ]);

    doc.autoTable({
      head: [['#', 'Job Poster', 'Poster Name', 'Payment Date', 'Amount', 'Payment ID']],
      body: tableData,
      startY: 30,
    });

    const reportName = `Payment_Report_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(reportName);
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ textAlign: 'left', padding: '20px', border: '1px solid #ffa500', borderRadius: '10px' }}>
        <span style={{ fontWeight: 'bold', fontSize: 24, paddingTop: '20px', display: 'block', color: '#ffa500' }}>
          Payment Information From Job Posters
        </span>
        <div style={{ padding: '10px' }}>
          <Table columns={columns} dataSource={currentData} pagination={false} rowKey="payment_id" bordered style={{ borderColor: '#ffa500' }} />
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              style={{ backgroundColor: '#ffa500', borderColor: '#ffa500', color: 'white' }}
            >
              Previous
            </Button>
            <Button
              style={{ marginLeft: '10px', backgroundColor: '#ffa500', borderColor: '#ffa500', color: 'white' }}
              disabled={currentPage * pageSize >= data.length}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Button
              onClick={generatePDF}
              style={{ backgroundColor: '#ffa500', borderColor: '#ffa500', color: 'white' }}
            >
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfoTableJobPoster;
