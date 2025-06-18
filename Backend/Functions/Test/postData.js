
const connection = require('./../../Services/connection')

module.exports = async function postData(req, res){
    const genarate = "INSERT INTO `randil_db`.`user` (`username`, `fname`, `lname`, `tpno`, `city`) VALUES (?, ?, ?, ?, ?);"

    const values = [
        req.body.username,
        req.body.first_name,
        req.body.last_name,
        req.body.tp_no,
        req.body.city
    ]

    connection.query(genarate, values, (err, data) => {
        if(err) return res.json(err)
        return res.json("User registered succefully")
    })

}