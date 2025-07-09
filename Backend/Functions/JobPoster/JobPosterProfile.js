const { upload, retrieve } = require("../../middleware/file_middleware");
const connection = require("../../Services/connection");
const { authenticateToken } = require("../Middlewares/TokenAuth");
const bcrypt = require("bcrypt");

const fs = require("fs");
const path = require("path");

const uploadProfilePictureHandler = async (req, res) => {
  const updateQuery =
    "UPDATE parttime_srilanka.job_poster SET profile_picture = ? WHERE poster_id = ?;";

  upload.single("profile_picture")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.body.poster_id) {
      if (req.file) {
        fs.unlink(path.join("uploads", req.file.filename), () => {});
      }
      return res.status(400).json({ error: "Poster ID is required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    connection.query(
      "SELECT * FROM parttime_srilanka.job_poster WHERE poster_id = ?",
      [req.body.poster_id],
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

        const values = [req.file.filename, req.body.poster_id];

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
    "SELECT profile_picture FROM parttime_srilanka.job_poster WHERE poster_id = ?;";

  const values = [req.body.poster_id];
  if (!req.body.poster_id) {
    return res.status(400).json({ error: "Poster ID is required" });
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
    "UPDATE parttime_srilanka.job_poster SET  firstname = ?, lastname = ?, emailAddress = ?, contactNumber = ?, address = ?, companyName = ?, password = ?, previousStatus = ?, approval_status = ?, active_status = ? WHERE poster_id = ?;";

  if (
    !req.body.poster_id ||
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.emailAddress ||
    !req.body.contactNumber ||
    !req.body.address ||
    !req.body.companyName ||
    !req.body.password ||
    !req.body.previousStatus ||
    !req.body.approval_status ||
    !req.body.active_status
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const values = [
    req.body.firstname,
    req.body.lastname,
    req.body.emailAddress,
    req.body.contactNumber,
    req.body.address,
    req.body.companyName,
    hashedPassword,
    req.body.previousStatus,
    req.body.approval_status,
    req.body.active_status,
    req.body.poster_id,
  ];
  connection.query(
    "select * from parttime_srilanka.job_poster where poster_id = ?",
    [req.body.poster_id],
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

module.exports = {
  uploadProfilePicture,
  retrieveProfilePicture,
  updatePersonalInfo,
};
