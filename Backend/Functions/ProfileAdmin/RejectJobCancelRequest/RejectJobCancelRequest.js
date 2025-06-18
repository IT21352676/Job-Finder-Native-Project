const connection = require('../../../Services/connection');

async function rejectJobCancelRequest(req, res) {

    try {
        const { id } = req.body;
        const query = `DELETE FROM  parttime_srilanka.job_cancel WHERE id = ${id};`;
        connection.query(query, (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(200).json({ message: 'Job Cancel Request Rejected' });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = rejectJobCancelRequest;