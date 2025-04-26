const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');
const Scheme = require('../models/Scheme');
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401);
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user; 
        next();
    });
};

router.post('/', authenticateToken, async (req, res) => {
    try {
        const { schemeName, feedbackText, rating } = req.body;

        const scheme = await Scheme.findOne({ schemeName });
        if (!scheme) {
            return res.status(404).json({ error: 'Scheme not found' });
        }

        if (!feedbackText || typeof rating !== 'number' || rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Invalid input' });
        }

        const feedback = new Feedback({
            userId: req.user.id, 
            schemeId: scheme._id,
            feedbackText,
            rating
        });

        await feedback.save();
        res.status(201).json(feedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;