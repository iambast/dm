const Admin = require('../models/Admin');
const HelpRequest = require('../models/HelpRequest');
const DisasterReport = require('../models/Disaster');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, mobile, adminId, username, password } = req.body;

    const existing = await Admin.findOne({ username });
    if (existing) return res.status(400).json({ error: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      name,
      mobile,
      adminId,
      username,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.getHelpRequests = async (req, res) => {
  const requests = await HelpRequest.find().sort({ timestamp: -1 });
  res.json(requests);
};

exports.getDisasterReports = async (req, res) => {
  const reports = await DisasterReport.find().sort({ reportedAt: -1 });
  res.json(reports);
};
