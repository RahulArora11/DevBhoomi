import Review from '../models/Review.js';
import Tour from '../models/Tour.js'

const createReview = async (req, res) => {
  try {
    const { username, rating, reviewText } = req.body;
    const tourId = req.params.tourId;

    if (!tourId || !rating) {
      return res.status(400).json({ message: 'Tour ID and rating are required' });
    }

    const tour = await Tour.findById(tourId);

    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    const newReview = new Review({ tourId, reviewText, rating, username });
    await newReview.save();

    tour.reviews.push(newReview._id);
    await tour.save();

    res.status(201).json({ success: true, message: 'Review created successfully', newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;

    if (!reviewId) {
      return res.status(400).json({ message: 'Review ID is required' });
    }

    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { createReview, deleteReview };