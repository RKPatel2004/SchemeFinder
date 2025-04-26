const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware to authenticate and extract userId from token
const authenticateToken = (req, res, next) => {
    console.log('Authenticating token...');
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401);
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Get all feedback with associated usernames
router.get('/', authenticateToken, async (req, res) => {
    try {
        const feedbacks = await Feedback.find()
            .populate('userId', 'username')        
            .populate('schemeId', 'schemeName')    
            .select('feedbackText rating');        

            const formattedFeedbacks = feedbacks.map(feedback => ({
            username: feedback.userId ? feedback.userId.username : null,
            schemeName: feedback.schemeId ? feedback.schemeId.schemeName : null,
            feedbackText: feedback.feedbackText,
            rating: feedback.rating
        }));

        res.status(200).json(formattedFeedbacks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete feedback by username
router.delete('/:username', authenticateToken, async (req, res) => {
    const { username } = req.params;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const result = await Feedback.deleteMany({ userId: user._id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No feedback found for this user' });
        }

        res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
