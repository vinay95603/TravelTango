const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/auth.js');
const listingRoutes = require("./routes/listing.js")
const bookingRoutes = require("./routes/booking.js")
const userRoutes = require("./routes/user.js")

// Load environment variables
try {  
  dotenv.config();
} catch (err) {
  console.error('Error loading .env file:', err);
}

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

/* ROUTES */
app.use('/auth', authRoutes);
app.use("/properties", listingRoutes)
app.use("/bookings", bookingRoutes)
app.use("/users", userRoutes)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3001; 
mongoose
  .connect(process.env.MONGO_URL, {  
    dbName: process.env.DB_NAME || 'Travel' 
  })
  .then(() => {  
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((err) => console.error('Failed to connect to MongoDB:', err));
