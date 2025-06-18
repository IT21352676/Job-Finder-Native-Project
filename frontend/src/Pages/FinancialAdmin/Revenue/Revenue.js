import React from 'react';
import RevenueTableJobPoster from "../../../components/FinancialAdmin/Tables/RevenueTableJobPoster";

function Income() {
    const styles = {
        revenueContainer: {
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        revenueTitle: {
            fontSize: '2rem',
            color: '#333',
            marginBottom: '1.5rem',
            textAlign: 'center',
            fontWeight: 600,
        },
        revenueTableWrapper: {
            backgroundColor: '#ffffff',
            borderRadius: '6px',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        },
    };

    return (
        <div style={styles.revenueContainer}>
            <h1 style={styles.revenueTitle}>Revenue Information</h1>
            <div style={styles.revenueTableWrapper}>
                <RevenueTableJobPoster />
            </div>
        </div>
    );
}

export default Income;
