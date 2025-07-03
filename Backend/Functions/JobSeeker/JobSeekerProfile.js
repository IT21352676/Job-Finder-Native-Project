const { authenticateToken } = require("../Middlewares/TokenAuth");

const addPersonalInfoHandler = async (req, res) => {
  res.status(501).json({ message: "This feature is not implemented yet" });
};

const addPersonalInfo = [authenticateToken, addPersonalInfoHandler];

module.exports = {
  addPersonalInfo,
};
