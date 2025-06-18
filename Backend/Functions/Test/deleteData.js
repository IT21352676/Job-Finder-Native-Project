const connection = require('./../../Services/connection');

module.exports = async function deleteData(req, res) {
    const iduser = req.query.iduser; 

    console.log(req.query.iduser);

    const deleteQuery = "DELETE FROM randil_db.user WHERE iduser = ?;";

    connection.query(deleteQuery, [iduser], (err, data) => {
        if (err) return res.json(err);
        return res.json("User deleted successfully");
    });
}