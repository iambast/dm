// controllers/disasterController.js
const Disaster = require('../models/Disaster');

const reportDisaster = async (req, res) => {
  try {
    const { name,contact,location,type,description} = req.body;
    const newDisaster = new Disaster({name,contact,location,type,description });
    await newDisaster.save();
    res.status(201).json({ message: 'Disaster reported successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error reporting disaster' });
  }
};

const getAllDisasters = async (req, res) => {
  try {
    const disasters = await Disaster.find();
    res.json(disasters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching disasters' });
  }
};

module.exports = {
  reportDisaster,
  getAllDisasters,
};
