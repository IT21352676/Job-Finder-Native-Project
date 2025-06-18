const connection = require('../../../Services/connection')


async function getDeactivatedJobSeekers(req, res){
    const sql = "SELECT * FROM parttime_srilanka.job_seeker WHERE status = 'approved' && ActiveStatus = 0;";

    connection.query(sql, (err, result)=>{
        if(err){
            console.error(err);
            return res.status(500).json("Error Getting Data.")
        }else{
           
            return res.status(200).json(result);
            }
        
    });
}

module.exports = getDeactivatedJobSeekers;