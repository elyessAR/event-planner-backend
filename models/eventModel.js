import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  location: String,
  startingDate: {
    type: Date,
    default: new Date(),
  },
  endingDate: {
    type: Date,
    default: new Date(),
  },
});

var EventModel = mongoose.model('EventModel', postSchema);

export default EventModel;
