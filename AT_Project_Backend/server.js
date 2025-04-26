const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const schemeRoute = require('./routes/schemes');
const feedbackRoute = require('./routes/feedbackRoute');

const adminSchemesRoute = require('./routes/adminSchemes');
const adminFeedbackRoute = require('./routes/adminFeedback');
const adminUsersRoute = require('./routes/adminUsers');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({ 
    origin: 'http://localhost:3000', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// Use routes
app.use('/api/users', registerRoute);
app.use('/api/users', loginRoute);
app.use('/api/schemes', schemeRoute);
app.use('/api/feedback', feedbackRoute);

// Use admin routes
app.use('/api/admin/schemes', adminSchemesRoute);
app.use('/api/admin/feedback', adminFeedbackRoute);
app.use('/api/admin/users', adminUsersRoute);

// Sample route
app.get('/', (req, res) => {
    res.send('Hello, SchemeFinder API is running!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
