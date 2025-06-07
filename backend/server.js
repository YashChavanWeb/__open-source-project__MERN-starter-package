import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './src/routes/user.routes.js';
import paymentRoutes from './src/routes/payment.routes.js';
import uploadRoutes from './src/routes/upload.routes.js';
import session from 'express-session';
import passport from 'passport';

import './passport.js';
import authRoutes from './src/routes/auth.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.use('/', authRoutes);


app.use(express.json());
app.use('/api/v1', userRouter);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/upload', uploadRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Mongoose is connected"))
    .catch((err) => console.log("Error in connecting Mongoose:", err));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
