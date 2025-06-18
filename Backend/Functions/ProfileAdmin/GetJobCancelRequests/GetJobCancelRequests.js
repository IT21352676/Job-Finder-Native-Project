const connection = require('../../../Services/connection');

async function getJobCancelRequests(req, res) {
    try {
        const query = `SELECT * FROM parttime_srilanka.job_cancel WHERE approved = 0;`;
        connection.query(query, (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(200).json(result);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = getJobCancelRequests;
