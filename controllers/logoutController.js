const logoutUser = (req, res) => {
  res.removeHeader("Authorization");
  res.json({ message: "Logged out successfully" });
};

module.exports = { logoutUser };