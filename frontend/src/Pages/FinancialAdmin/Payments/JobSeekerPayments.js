import React from 'react';
import PaymentInfoTableJobSeeker from '../../../components/FinancialAdmin/Tables/PaymentInfoTableJobSeekers';

function JobSeekerPayments() {
    const styles = {
        jobSeekerPaymentsContainer: {
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        paymentsTitle: {
            fontSize: '2rem',
            color: '#333',
            marginBottom: '1.5rem',
            textAlign: 'center',
            fontWeight: 600,
        },
        paymentTableWrapper: {
            backgroundColor: '#ffffff',
            borderRadius: '6px',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        },
    };

    return (
        <div style={styles.jobSeekerPaymentsContainer}>
            <h1 style={styles.paymentsTitle}>Job Seeker Payment Information</h1>
            <div style={styles.paymentTableWrapper}>
                <PaymentInfoTableJobSeeker />
            </div>
        </div>
    );
}

export default JobSeekerPayments;
