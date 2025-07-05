const { upload, retrieve } = require("../../middleware/file_middleware");
const { authenticateToken } = require("../Middlewares/TokenAuth");
const connection = require("./../../Services/connection");
const bcrypt = require("bcrypt");

const fs = require("fs");
const path = require("path");

const uploadProfilePictureHandler = async (req, res) => {
  const updateQuery =
    "UPDATE parttime_srilanka.job_seeker SET profile_picture = ? WHERE seeker_id = ?;";

  upload.single("profile_picture")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.body.seeker_id) {
      if (req.file) {
        fs.unlink(path.join("uploads", req.file.filename), () => {});
      }
      return res.status(400).json({ error: "Seeker ID is required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    connection.query(
      "SELECT * FROM parttime_srilanka.job_seeker WHERE seeker_id = ?",
      [req.body.seeker_id],
      (err, data) => {
        if (err) {
          fs.unlink(path.join("uploads", req.file.filename), () => {});
          return res.status(500).json(err);
        }

        if (data.length <= 0) {
          fs.unlink(path.join("uploads", req.file.filename), (unlinkErr) => {
            if (unlinkErr) console.error("File deletion failed:", unlinkErr);
            else console.log("File deleted due to no user found");
          });

          return res.status(404).json({ error: "No user found" });
        }

        const values = [req.file.filename, req.body.seeker_id];

        connection.query(updateQuery, values, (err, data) => {
          if (err) return res.status(500).json(err);
          return res.json({ message: "Profile picture updated successfully" });
        });
      }
    );
  });
};

const uploadProfilePicture = [authenticateToken, uploadProfilePictureHandler];

const retrieveProfilePictureHandler = async (req, res) => {
  const selectQuery =
    "SELECT profile_picture FROM parttime_srilanka.job_seeker WHERE seeker_id = ?;";

  const values = [req.body.seeker_id];
  if (!req.body.seeker_id) {
    return res.status(400).json({ error: "Seeker ID is required" });
  }

  connection.query(selectQuery, values, (err, data) => {
    if (err) return res.json(err);
    if (data.length <= 0) {
      return res.status(404).json({ error: "No profile picture found" });
    }
    const fileBuffer = retrieve(data[0].profile_picture);
    if (fileBuffer && fileBuffer.data) {
      res.writeHead(200, {
        "Content-Type": fileBuffer.mimeType,
        "Content-Length": fileBuffer.data.length,
      });
      res.end(fileBuffer.data);
    } else {
      res.status(404).json({ error: "File not found" });
    }
  });
};
const retrieveProfilePicture = [
  authenticateToken,
  retrieveProfilePictureHandler,
];

const updatePersonalInfoHandler = async (req, res) => {
  const updateQuery =
    "UPDATE parttime_srilanka.job_seeker SET email = ?, firstname = ?, lastname = ?, nic = ?, birthday = ?, gender = ?, telnumber = ?, addressLine = ?, city = ?, province = ?, password = ?, status = ?, activeStatus = ? WHERE seeker_id = ?;";

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const values = [
    req.body.email,
    req.body.firstname,
    req.body.lastname,
    req.body.nic,
    req.body.birthday,
    req.body.gender,
    req.body.telnumber,
    req.body.addressLine,
    req.body.city,
    req.body.province,
    hashedPassword,
    req.body.status,
    req.body.activeStatus,
    req.body.seeker_id,
  ];

  if (
    !req.body.email ||
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.nic ||
    !req.body.birthday ||
    !req.body.gender ||
    !req.body.telnumber ||
    !req.body.addressLine ||
    !req.body.city ||
    !req.body.province ||
    !req.body.password ||
    !req.body.status ||
    !req.body.activeStatus ||
    !req.body.seeker_id
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  connection.query(
    "select * from parttime_srilanka.job_seeker where seeker_id = ?",
    [req.body.seeker_id],
    (err, data) => {
      if (err) return res.json(err);
      if (data.length <= 0) {
        return res.status(404).json({ error: "No user found" });
      }
    }
  );

  connection.query(updateQuery, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Personal information updated successfully");
  });
};

const updatePersonalInfo = [authenticateToken, updatePersonalInfoHandler];

const addSkillsHandler = async (req, res) => {
  const updateQuery =
    "UPDATE parttime_srilanka.job_seeker SET skills = ? WHERE seeker_id = ?;";

  const values = [req.body.skills, req.body.seeker_id];

  if (!req.body.skills || !req.body.seeker_id) {
    return res.status(400).json({ error: "Skills and seeker_id are required" });
  }

  connection.query(
    "select * from parttime_srilanka.job_seeker where seeker_id = ?",
    [req.body.seeker_id],
    (err, data) => {
      if (err) return res.json(err);
      if (data.length <= 0) {
        return res.status(404).json({ error: "No user found" });
      }
    }
  );

  connection.query(updateQuery, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Skills updated successfully");
  });
};

const addSkills = [authenticateToken, addSkillsHandler];

const addTimeAvailabilityHandler = async (req, res) => {
  const updateQuery =
    "UPDATE parttime_srilanka.job_seeker SET time_availability = ? WHERE seeker_id = ?;";

  const values = [req.body.time_availability, req.body.seeker_id];

  if (!req.body.time_availability || !req.body.seeker_id) {
    return res
      .status(400)
      .json({ error: "Time availability and seeker_id are required" });
  }

  connection.query(
    "select * from parttime_srilanka.job_seeker where seeker_id = ?",
    [req.body.seeker_id],
    (err, data) => {
      if (err) return res.json(err);
      if (data.length <= 0) {
        return res.status(404).json({ error: "No user found" });
      }
    }
  );

  connection.query(updateQuery, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Time availability updated successfully");
  });
};

const addTimeAvailability = [authenticateToken, addTimeAvailabilityHandler];

const addReviewHandler = async (req, res) => {
  const insertQuery =
    "INSERT INTO parttime_srilanka.job_seeker_reviews (seeker_id, job_id, rating, review) VALUES (?, ?, ?, ?);";

  const values = [
    req.body.seeker_id,
    req.body.job_id,
    req.body.rating,
    req.body.review,
  ];

  if (
    !req.body.seeker_id ||
    !req.body.job_id ||
    !req.body.rating ||
    !req.body.review
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  connection.query(insertQuery, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Review added successfully");
  });
};

const addReview = [authenticateToken, addReviewHandler];
module.exports = {
  updatePersonalInfo,
  addSkills,
  addTimeAvailability,
  addReview,
  uploadProfilePicture,
  retrieveProfilePicture,
};
