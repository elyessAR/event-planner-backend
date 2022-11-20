import express from 'express';
import {
  getEvents,
  createEvent,
  getEventsBySearch,
  deleteEvent,
  likeEvent,
  getEvent,
  updateEvent,
  getEventsByLocation,
} from '../controllers/events.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getEvents); // changing the order of these make a difference between router.get('/:id', getPost); and router.get('/search', getPostsBySearch);

router.get('/search', getEventsBySearch);

router.post('/', auth, createEvent);
router.patch('/:id', auth, updateEvent);
router.delete('/:id', auth, deleteEvent);
router.patch('/:id/likeEvent', auth, likeEvent);
router.get('/searchLocation', getEventsByLocation);
router.get('/:id', getEvent);

export default router;
