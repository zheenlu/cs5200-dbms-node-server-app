import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './Users/routes.js';
import goalRoutes from './goals/routes.js';

const app = express();
const port = 4000;


app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json());
app.use(bodyParser.json()); 

app.use((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  
  if (token) {
      const decoded = jwt.verify(token, 'your_secret_key'); 
      req.user = { id: decoded.userId };
      next();
  } else {
      next();
  }
});


userRoutes(app);
goalRoutes(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});