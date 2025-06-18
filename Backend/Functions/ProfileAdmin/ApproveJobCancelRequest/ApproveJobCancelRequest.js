const connection = require('../../../Services/connection');

async function approveJobCancelRequest(req, res) {
    try {
        const { id } = req.body;
        const query = `UPDATE parttime_srilanka.job_cancel SET approved = 1 WHERE id = ${id};`;
        connection.query(query, (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(200).json({ message: 'Job Cancel Request Approved' });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = approveJobCancelRequest;