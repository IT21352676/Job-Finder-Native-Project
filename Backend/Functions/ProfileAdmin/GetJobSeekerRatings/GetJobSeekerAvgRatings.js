const connection = require('../../../Services/connection')

async function getJobSeekerAvgRatings(req, res){
    const sql = 'SELECT js.FirstName , js.LastName,js.UserName AS SeekerEmail,ROUND(AVG(sr.rate), 1) AS average_rating FROM job_seeker js JOIN seeker_ratings sr ON js.UserName = sr.seeker GROUP BY js.UserName;'
    connection.query(sql, (err, result)=>{
        if(err){
            res.status(500).send('Error Retriving Ratings')
        }else{
            res.status(200).send(result)
        }
    })
}


module.exports = getJobSeekerAvgRatings