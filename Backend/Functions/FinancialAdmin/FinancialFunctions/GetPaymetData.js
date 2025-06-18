const connection = require('../../../Services/connection');
const { HttpStatusCode } = require('axios');


module.exports = async function getPaymentData(req, res){
    try {
        const query1 = 'select job_poster,payment_date, amount ,payment_id from parttime_srilanka.payment inner join parttime_srilanka.job  where payment.job_id = job.job_id;';
        const query2 = 'select FirstName, LastName from job_poster where EmailAddress=?';
    
        const data1 = await queryAsync(query1);
        const returnData = [];
        
        if(data1 != null){
            for (const job of data1) {
                const user = await queryAsync(query2, job.job_poster);
                job.posterName = user[0].FirstName+' '+user[0].LastName;
                returnData.push(job);
            }
            return res.status(HttpStatusCode.Ok).json(returnData);
        }else{
            return res.status(HttpStatusCode.NotFound).json("Ads not found");
        }
    } catch (error) {
        console.log(error);
        return res.status(HttpStatusCode.InternalServerError).json("Internal Server Error");
    }

}

// Helper function to wrap connection.query in a promise
function queryAsync(query, values) {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}