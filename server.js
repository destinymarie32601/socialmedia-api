const express = require('express');
const connectDB = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

connectDB()
  .then(() => {
    // Start the server after successful database connection
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit with failure
  });