require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.port;
const authRouter = require('./routes/auth');
const authenticationMiddleware = require('./middlewares/auth');

//mongodb connection
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('MongoDB connected');
    })
   


// middleware
app.use(cors());
app.use(express.json());
app.use(authenticationMiddleware());

//routes
app.use('/api/v1/auth',authRouter );

app.get('/', (req, res) => res.json({ status: 'Success' }))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});