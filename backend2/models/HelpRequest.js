import mongoose from 'mongoose';

const helpRequestSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
  location: String,
  familyMembers: Number,
  helpType: String,
 
});

const HelpRequest = mongoose.model('HelpRequest', helpRequestSchema);
// module.exports = HelpRequest;
// export default HelpRequest;
export default HelpRequest;
