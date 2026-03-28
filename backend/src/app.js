const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

const authRoutes = require('./routes/auth.routes');
const noteRoutes = require('./routes/note.routes');
const loginRoutes = require('./routes/login.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();


app.set('trust proxy', 1);


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later"
});
app.use(limiter);


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(morgan("dev"));


app.use(express.json());
app.use(cookieParser());


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/login', loginRoutes);
app.use('/api/v1/note', noteRoutes);


app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});



app.use(errorHandler);

module.exports = app;