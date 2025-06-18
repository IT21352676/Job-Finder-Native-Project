const bcrypt = require('bcrypt');
const connection = require('../../../Services/connection');

async function SuperAdminLogin(req, res) {
    const { email, password } = req.body;

    try {
        const sql = "SELECT * FROM admins WHERE Email = ? AND AdminRole = 'Super'";
        connection.query(sql, [email], async (err, result) => {
            if (err) {
                console.error("Error during login query:", err);
                return res.status(500).send("Internal server error.");
            }

            if (result.length === 0) {
                return res.status(401).send("Invalid credentials.");
            }

            const admin = result[0];

            if (admin.status != 'Active') {
                if (isPasswordCorrect) {
                    return res.status(309).send("");
                } else {
                    return res.status(401).send("Invalid credentials.");
                }
            }

            
            console.log(admin);
            const isPasswordCorrect = await bcrypt.compare(password, admin.Password);
            if (admin.password_status === 'temporary') {
                if (isPasswordCorrect) {
                    return res.status(309).send("Password must be changed.");
                } else {
                    return res.status(401).send("Invalid credentials.");
                }
            } else {
                if (!isPasswordCorrect) {
                    return res.status(401).send("Invalid credentials.");
                } else {
                    return res.status(200).json("Login successful.");
                }
            }
        });
    } catch (error) {
        console.error("Error in SuperAdminLogin:", error);
        return res.status(500).send("Internal server error.");
    }
}

module.exports = SuperAdminLogin;
