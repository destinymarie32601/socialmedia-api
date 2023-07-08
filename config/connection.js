const mongoose = require('mongoose');
//connect to database created
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1/social_media_DB' , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit with failure
  }
};

connectDB();

module.exports = connectDB;