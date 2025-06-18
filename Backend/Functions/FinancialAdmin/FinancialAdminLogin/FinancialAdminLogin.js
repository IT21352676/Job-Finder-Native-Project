const bcrypt = require('bcrypt');
const connection = require('../../../Services/connection');

async function FinancialAdminLogin(req, res) {
    const { email, password } = req.body;

    try {
        const sql = "SELECT * FROM admins WHERE Email = ? AND AdminRole = 'Financial'";
        connection.query(sql, [email], async (err, result) => {
            if (err) {
                console.error("Error during login query:", err);
                return res.status(500).send("Internal server error.");
            }

            if (result.length === 0) {
                return res.status(401).send("Invalid credentials.");
            }

            const admin = result[0];

            const isPasswordCorrect = await bcrypt.compare(password, admin.Password);

            if (!isPasswordCorrect) {
                return res.status(401).send("Invalid credentials.");
            }

            if (admin.status !== 'Active') {
                return res.status(401).send("Contact admin.");
            }

            if (admin.password_status === 'temporary') {
                return res.status(309).send("Password must be changed.");
            }

            return res.status(200).json("Login successful.");
        });
    } catch (error) {
        console.error("Error in FinancialAdminLogin:", error);
        return res.status(500).send("Internal server error.");
    }
}

module.exports = FinancialAdminLogin;
