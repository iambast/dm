import HelpRequest from '../models/HelpRequest.js';

export const requestHelp = async (req, res) => {
  try {
    const { fullName, phoneNumber, location, familyMembers, helpType } = req.body;
    const newHelpRequest = new HelpRequest({
      fullName,
      phoneNumber,
      location,
      familyMembers,
      helpType,
    });
    await newHelpRequest.save();
    res.status(201).json({ message: 'Help request submitted successfully' });
  } catch (error) {
    console.error('Error submitting help request:', error.message);
    res.status(500).json({ message: 'Error submitting help request' });
  }
};

export const getAllHelpRequests = async (req, res) => {
  try {
    const requests = await HelpRequest.find();
    res.json(requests);
  } catch (error) {
    console.error('Error fetching help requests:', error.message);
    res.status(500).json({ message: 'Error fetching help requests' });
  }
};
