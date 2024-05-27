const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Import routes
const authRoutes = require('./routes/auth');

// Use routes
app.use('/api', authRoutes);

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
