const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const companyRoutes = require('./src/routes/companies.route');
const userRoutes = require('./src/routes/users.route');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/companies', companyRoutes);
app.use('/users', userRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('MongoDB connection failed:', err));
