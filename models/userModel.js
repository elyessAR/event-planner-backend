import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  name: { type: String, reqiured: true },
  email: { type: String, reqiured: true },
  password: { type: String, reqiured: true },
  id: { type: String },
});

var userModel = mongoose.model('userModel', postSchema);

export default userModel;
