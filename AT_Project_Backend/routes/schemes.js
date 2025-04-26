const express = require('express');
const router = express.Router();
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

router.post('/suggest', authenticateToken, async (req, res) => {
    try {
        const { age, gender, profession, category, economicClass, isSpeciallyAbled, isMarried } = req.body;
        const isSpeciallyAbledStr = isSpeciallyAbled === 'YES' ? 'yes' : 'no';
        const isMarriedStr = isMarried === 'YES' ? 'yes' : 'no';

        const query = {
            'eligibilityCriteria.age.min': { $lte: age },
            'eligibilityCriteria.age.max': { $gte: age },
            $and: [
                {
                    $or: [
                        { 'eligibilityCriteria.gender': gender },
                        { 'eligibilityCriteria.gender': 'any' }
                    ]
                },
                {
                    $or: [
                        { 'eligibilityCriteria.profession': profession },
                        { 'eligibilityCriteria.profession': 'any' }
                    ]
                },
                {
                    $or: [
                        { 'eligibilityCriteria.category': category },
                        { 'eligibilityCriteria.category': 'any' }
                    ]
                },
                {
                    $or: [
                        { 'eligibilityCriteria.economicClass': economicClass },
                        { 'eligibilityCriteria.economicClass': 'BPL/APL' }
                    ]
                },
                {
                    $or: [
                        { 'eligibilityCriteria.isSpeciallyAbled': isSpeciallyAbledStr },
                        { 'eligibilityCriteria.isSpeciallyAbled': 'any' }
                    ]
                },
                {
                    $or: [
                        { 'eligibilityCriteria.isMarried': isMarriedStr },
                        { 'eligibilityCriteria.isMarried': 'any' }
                    ]
                }
            ]
        };

        const schemes = await Scheme.find(query);
        res.status(200).json(schemes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Schemes
router.get('/', async (req, res) => {
    try {
        const schemes = await Scheme.find();
        res.status(200).json(schemes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:schemeId", async (req, res) => {
    try {
      const scheme = await Scheme.findById(req.params.schemeId);
      if (!scheme) return res.status(404).json({ error: "Scheme not found" });
      res.status(200).json(scheme);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

module.exports = router;


