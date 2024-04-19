import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import userRoutes from './Users/routes.js';
import goalRoutes from './goals/routes.js';
// import categoryRoutes from './categories/routes.js';
// import resourceRoutes from './resources/routes.js';
// import sessionRoutes from './study_sessions/routes.js';
// import reminderRoutes from './progress_reminders/routes.js';

const app = express();
const port = 4000;


app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json());
app.use(bodyParser.json()); // Parses JSON data in request bodies

// Global middleware for authentication
app.use((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Assuming Bearer token
  if (token) {
      // Decode the token and set req.user
      const decoded = jwt.verify(token, 'your_secret_key');  // Adjust this to your actual secret key and token structure
      req.user = { id: decoded.userId };
      next();
  } else {
      next();
  }
});



userRoutes(app);
goalRoutes(app);
// categoryRoutes(app);
// resourceRoutes(app);
// sessionRoutes(app);
// reminderRoutes(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});