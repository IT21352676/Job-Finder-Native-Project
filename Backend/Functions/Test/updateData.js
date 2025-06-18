const connection = require('./../../Services/connection');

module.exports = async function updateData(req, res) {

    const updateQuery = "UPDATE randil_db.user SET username = ?, fname = ?, lname = ?, city = ?, tpno = ? WHERE iduser = ?;";

    // console.log(iduser)

    const values = [
        req.body.username,
        req.body.first_name,
        req.body.last_name,
        req.body.city,
        req.body.tp_no,
        req.body.iduser
    ];

    connection.query(updateQuery, values, (err, data) => {
        if (err) return res.json(err);
        return res.json("User updated successfully");
    });
}