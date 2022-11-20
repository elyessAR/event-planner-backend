import EventModel from '../models/EventModel.js';
import mongoose from 'mongoose';

export const getEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await EventModel.findById(id);
    res.status(200).json(event);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getEvents = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 12;
    const startIndex = (Number(page) - 1) * LIMIT; //get the starting index of every page
    const total = await EventModel.countDocuments({});

    const events = await EventModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex).exec();

    res.status(200).json({ data: events, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getEventsBySearch = async (req, res) => {
  const { searchQuery, loc } = req.query;
  console.log(req.query);
  console.log(loc);

  try {
    const title = new RegExp(searchQuery, 'i');
    console.log(title);

    const events = await EventModel.find({ title });
    res.json({ data: events });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getEventsByLocation = async (req, res) => {
  const locQuery = req.query.searchQuery;

  console.log(req.query);
  console.log(locQuery);

  try {
    const location = new RegExp(locQuery, 'i');
    console.log(location);

    const events = await EventModel.find({ location });
    res.json({ data: events });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createEvent = async (req, res) => {
  const event = req.body;

  const newEventModel = new EventModel({
    ...event,
    creator: req.userId,
    createdAt: new Date().toISOString(),
    startingDate: new Date(event.startingDate),
    endingDate: new Date(event.endingDate),
  });

  try {
    if (newEventModel.startingDate.getTime() < newEventModel.endingDate.getTime()) {
      await newEventModel.save();
    } else {
      return res.status(401).send('ending date cannot be less then starting date');
    }

    return res.status(201).json(newEventModel);
  } catch (error) {
    console.log(error);
  }
};

export const updateEvent = async (req, res) => {
  const { title, message, creator, selectedFile, tags, location, startingDate, endingDate } = req.body;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no event with that id');
  const updatedEvent = { creator, title, message, tags, selectedFile, _id: id, location, startingDate, endingDate };
  await EventModel.findByIdAndUpdate(id, updatedEvent, { new: true });
  res.json(updatedEvent);
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no event with that id');
  await EventModel.findByIdAndRemove(id);
  res.json({ message: 'Event Deleted Successfully.' });
};

export const likeEvent = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) return res.json({ message: 'unauthenticated' });

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with that id');

  const event = await EventModel.findById(id);
  const index = event.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    event.likes.push(req.userId);
  } else {
    event.likes = event.likes.filter((id) => id !== String(req.userId));
  }

  const updatedEvent = await EventModel.findByIdAndUpdate(id, event, { new: true });

  res.json(updatedEvent);
};
