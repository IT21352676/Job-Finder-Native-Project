import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, message } from 'antd';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const columns = [
    {
        title: 'Payment ID',
        dataIndex: 'payment_id',
        key: 'payment_id',
    },
    {
        title: 'Date',
        dataIndex: 'payment_date',
        key: 'payment_date',
    },
    {
        title: 'Service Charge',
        dataIndex: 'service_charge',
        key: 'service_charge',
    },
    {
        title: 'Job Poster',
        dataIndex: 'posterName',
        key: 'posterName',
    },
];

const RevenueInfoTableJobPoster = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 7;

    useEffect(() => {
        axios.get('http://localhost:8000/getFinancialData')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                message.error('Error fetching data');
            });
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const currentData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.text("Revenue Information From Job Posters", 14, 16);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 22);

        const tableData = data.map((item, index) => [
            index + 1,
            item.payment_id,
            new Date(item.payment_date).toLocaleDateString(),
            item.service_charge,
            item.posterName,
        ]);

        doc.autoTable({
            head: [['#', 'Payment ID', 'Date', 'Service Charge', 'Job Poster']],
            body: tableData,
            startY: 30,
        });

        const reportName = `Revenue_Report_${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(reportName);
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ textAlign: 'left', padding: '20px', border: '1px solid #ffa500', borderRadius: '10px' }}>
                <span style={{ fontWeight: 'bold', fontSize: 24, paddingTop: '20px', display: 'block', color: '#ffa500' }}>
                    Revenue Information From Job Posters
                </span>
                <div style={{ padding: '10px' }}>
                    <Table
                        columns={columns}
                        dataSource={currentData}
                        pagination={false}
                        rowKey="payment_id"
                        bordered
                        style={{ borderColor: '#ffa500' }}
                    />
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

export default RevenueInfoTableJobPoster;
