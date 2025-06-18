const connection = require('../../../Services/connection');

module.exports = async function fetchFinancialDataJobSeeker(req, res) {
    try {
        const sql = `
            SELECT payment.payment_id, payment.payment_date, payment.seeker_charge, job.job_id
            FROM parttime_srilanka.payment 
            INNER JOIN parttime_srilanka.job ON payment.job_id = job.job_id
        `;

        connection.query(sql, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json("Internal Server Error");
            } else {
                res.status(200).json(result);
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error");
    }
};
