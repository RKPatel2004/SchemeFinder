const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  schemeName: { type: String, required: true },
  description: { type: String, required: true },
  eligibilityCriteria: {
    age: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    gender: { type: String, enum: ['any', 'male', 'female'], default: 'any' },
    profession: { 
      type: String, 
      enum: ['any', 'student', 'entrepreneur', 'soldier/policeman', 'farmer', 'Unemployed/Unskilled workers', 'housewife'], 
      default: 'any' 
    },
    category: { type: String, enum: ['any', 'SC/ST', 'OBC', 'General'], default: 'any' },
    economicClass: { 
      type: String, 
      enum: ['any', 'BPL', 'BPL/APL'], 
      default: 'any' 
    },
    isSpeciallyAbled: { 
      type: String, 
      enum: ['any', 'yes', 'no'], 
      default: 'any' 
    },
    isMarried: { 
      type: String, 
      enum: ['any', 'yes', 'no'], 
      default: 'any' 
    },
  },
  benefits: [{ type: String }],
  applicationProcess: [{ type: String }],
  requiredDocuments: [{ type: String }],
});

module.exports = mongoose.model('Scheme', schemeSchema);
