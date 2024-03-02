require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const { checkForAuthentication } = require('./middleware/auth')
const authRoute = require('./routes/auth')

//const { blogRouter } = require('./routes/blog')



mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB is connected successfully');
   
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const app = express();
app.use(cors());
app.use(express.json())
app.use(checkForAuthentication)

const PORT =process.env.PORT;


app.get('/', (req, res) => res.json({ message: 'ok' }))

app.use('/auth', authRoute)
//app.use('/blog', blogRoute)

const server = app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));

// Import and use the Socket.IO logic
const initializeSocket = require('./socket/socket');
const io = initializeSocket(server);