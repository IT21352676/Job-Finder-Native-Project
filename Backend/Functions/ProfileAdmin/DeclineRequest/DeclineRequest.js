const connection = require('../../../Services/connection')


async function declineRequest(req, res){
    const sql = "UPDATE `parttime_srilanka`.`job_poster` SET `ApprovedStatus` = 'declined' WHERE (`JobPosterID` = ?);";
    

    connection.query(sql, req.params.id,(err, result)=>{
        if(err){
            console.error(err);
            return res.status(500).json("error decline request.")
        }else{
            return res.status(200).json("user declined.")
        }
    });
}

module.exports = declineRequest