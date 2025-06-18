const connection = require('./../../Services/connection')

module.exports = async function getData(req, res){
    const query = "SELECT * FROM randil_db.user WHERE username = ?;"
    
    const value = req.query.username

    connection.query(query, [value], (err, data) => {
        if(err){
            return res.json(err)
        }else if(data.length == 0){
            return res.json("User not found")
        }else{
            return res.json(data[0])
        }
    })
}