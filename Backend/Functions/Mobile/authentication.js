const bcrypt = require("bcrypt");
const connection = require("../../Services/connection");
const jwt = require("jsonwebtoken");

// DESC: REGISTER AS A JOB SEEKER AND JOB POSTER FORM CONTROLLER
const registrationController = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      address1,
      address2,
      city,
      postalcode,
      gender,
      role,
      password,
      confirmpassword,
    } = req.body;

    // Check for missing fields
    if (
      !firstname ||
      !lastname ||
      !email ||
      !phone ||
      !address1 ||
      !address2 ||
      !city ||
      !postalcode ||
      !gender ||
      !role ||
      !password ||
      !confirmpassword
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if passwords match
    if (password !== confirmpassword) {
      return res.status(400).json({ error: "Passwords are mismatched!" });
    }

    // Check if user already exists
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    connection.query(checkUserQuery, [email], async (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error", details: err });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: "Email already registered" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user
      const insertUserQuery = `
        INSERT INTO users (
          firstname, lastname, email, phone, address1, address2,
          city, postalcode, gender, role, password
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const userData = [
        firstname,
        lastname,
        email,
        phone,
        address1,
        address2,
        city,
        postalcode,
        gender,
        role,
        hashedPassword,
      ];

      connection.query(insertUserQuery, userData, (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Database error", details: err });
        }

        return res
          .status(201)
          .json({ message: "User registered successfully" });
      });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
};
//DESC: JOB SEEKER IDENTITY VALIDATION CONTROLLER

//DESC: LOGIN FORM CONTROLLER
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if user exists
    const getUserQuery = "SELECT * FROM users WHERE email = ?";
    connection.query(getUserQuery, [email], async (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error", details: err });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const user = results[0];

      // Compare hashed passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
        },
      });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
};
