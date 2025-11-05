import express from 'express';
import { createBooking, getBooking, getAllBookings, deleteBooking } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', createBooking);

router.get('/:id', getBooking);
router.delete('/:id', deleteBooking);

router.get('/', getAllBookings);

export default router;
