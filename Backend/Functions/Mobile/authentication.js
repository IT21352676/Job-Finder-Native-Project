const bcrypt = require("bcrypt");
const connection = require("../../Services/connection");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const util = require("util");

// Promisify the MySQL connection.query
const query = util.promisify(connection.query).bind(connection);

// DESC: REGISTER AS A JOB SEEKER
const jobSeekerRegistrationController = async (req, res) => {
  const {
    firstname,
    lastname,
    username,
    nic,
    birthday,
    gender,
    telnumber,
    addressLine,
    street,
    city,
    province,
    password,
    confirmpassword,
  } = req.body;

  // Validation
  const requiredFields = {
    firstname,
    lastname,
    username,
    nic,
    birthday,
    gender,
    telnumber,
    addressLine,
    street,
    city,
    province,
    password,
    confirmpassword,
  };

  const frontDoc = req.files?.profileDoc_front?.[0];
  const backDoc = req.files?.profileDoc_back?.[0];

  if (!frontDoc || !backDoc) {
    return res
      .status(400)
      .json({ message: "Both profile documents are required" });
  }

  for (const [key, value] of Object.entries(requiredFields)) {
    if (!value) {
      return res.status(400).json({ error: `${key} is required` });
    }
  }

  if (password !== confirmpassword) {
    return res.status(400).json({ error: "Passwords are mismatched!" });
  }

  try {
    // Check for existing user
    const existingUsers = await query(
      `SELECT * FROM parttime_srilanka.job_seeker WHERE nic = ? OR username = ?`,
      [nic, username]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: "User already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const insertUserQuery = `
      INSERT INTO parttime_srilanka.job_seeker (
        username, firstname, lastname, nic, birthday, gender,
        telnumber, addressLine, street, city, province,
        profileDoc_front, profileDoc_back, password
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const userData = [
      username,
      firstname,
      lastname,
      nic,
      birthday,
      gender,
      telnumber,
      addressLine,
      street,
      city,
      province,
      frontDoc.filename,
      backDoc.filename,
      hashedPassword,
    ];

    await query(insertUserQuery, userData);

    return res
      .status(201)
      .json({ message: "Job seeker registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    return res
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
};

// DESC: REGISTER AS A JOB POSTER
const jobPosterRegistrationController = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      address,
      company,
      password,
      confirmpassword,
    } = req.body;

    // Check for missing fields
    if (
      !firstname ||
      !lastname ||
      !email ||
      !phone ||
      !address ||
      !company ||
      !password ||
      !confirmpassword
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const frontDoc = req.files?.profileDoc_front?.[0];
    const backDoc = req.files?.profileDoc_back?.[0];

    if (!frontDoc || !backDoc) {
      return res
        .status(400)
        .json({ message: "Both profile documents are required" });
    }

    // Check if passwords match
    if (password !== confirmpassword) {
      return res.status(400).json({ error: "Passwords are mismatched!" });
    }

    // Check if user already exists
    const checkUserQuery =
      "SELECT * FROM parttime_srilanka.job_poster WHERE email = ?";
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
        INSERT INTO parttime_srilanka.job_poster (
          firstname, lastname, emailAddress, contactNumber, address, companyName,
          proofDoc_front, proofDoc_back, password
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const userData = [
        firstname,
        lastname,
        email,
        phone,
        address,
        company,
        frontDoc.filename,
        backDoc.filename,
        proofDoc_back,
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

//DESC: LOGIN FORM CONTROLLER FOR JOB SEEKER
const jobSeekerLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if user exists
    const getUserQuery =
      "SELECT * FROM parttime_srilanka.job_seeker WHERE email = ?";
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

//DESC: LOGIN FORM CONTROLLER FOR JOB POSTER
const jobPosterLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if user exists
    const getUserQuery =
      "SELECT * FROM parttime_srilanka.job_poster WHERE email = ?";
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

module.exports = {
  jobPosterRegistrationController,
  jobSeekerRegistrationController,
  jobPosterLoginController,
  jobSeekerLoginController,
};
