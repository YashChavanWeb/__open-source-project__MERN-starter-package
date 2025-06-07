import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  auth0Id: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: String,
  picture: String,
  password: { type: String, default: '' }, // ✅ Add password field (optional)
});

const User = mongoose.model('User1', userSchema);

export default User;
