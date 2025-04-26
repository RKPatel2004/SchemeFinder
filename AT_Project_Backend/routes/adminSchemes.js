const express = require('express');
const router = express.Router();
const Scheme = require('../models/Scheme');
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

// Get all schemes
router.get('/', authenticateToken, async (req, res) => {
    try {
        const schemes = await Scheme.find();
        res.status(200).json(schemes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new scheme
router.post('/add', authenticateToken, async (req, res) => {
    try {
        const newScheme = new Scheme(req.body);
        await newScheme.save();
        res.status(201).json(newScheme);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a scheme
router.put('/:schemeName', authenticateToken, async (req, res) => {
    try {
        const updatedScheme = await Scheme.findOneAndUpdate(
            { schemeName: req.params.schemeName },
            req.body,
            { new: true }
        );
        if (!updatedScheme) return res.status(404).json({ error: 'Scheme not found' });
        res.status(200).json(updatedScheme);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a scheme
router.delete('/:schemeName', authenticateToken, async (req, res) => {
    try {
        const deletedScheme = await Scheme.findOneAndDelete({ schemeName: req.params.schemeName });
        if (!deletedScheme) return res.status(404).json({ error: 'Scheme not found' });
        res.status(200).json({ message: 'Scheme deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
