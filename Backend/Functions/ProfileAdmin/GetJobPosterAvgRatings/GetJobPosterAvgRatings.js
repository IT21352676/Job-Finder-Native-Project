const connection = require('../../../Services/connection')

async function getJobPoterAvgRatings(req, res){
    const sql = 'SELECT jp.FirstName, jp.LastName, jp.EmailAddress, ROUND(AVG(pr.rate), 1) AS average_rating FROM job_poster jp JOIN poster_ratings pr ON jp.EmailAddress = pr.poster GROUP BY jp.EmailAddress;'

    connection.query(sql, (err, result)=>{
        if(err){
            res.status(500).send('Error Retriving Ratings')
        }else{
            res.status(200).send(result)
        }
    })
}


module.exports = getJobPoterAvgRatings