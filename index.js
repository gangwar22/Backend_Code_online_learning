const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const createUserRouter = require('./CreateUser.js');
const loginUserRouter = require('./UserLogin');

const app = express();
const port = 3000;

app.use(cors({
  origin: true,
  methods: ["PUT", "DELETE", "POST", "GET"],
  credentials: true
}));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://rahulgangwar22:Pcs6QGJe8GOObB59@cluster0.sbksrzf.mongodb.net/Gofoodmern?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => console.error("MongoDB connection error:", err));

app.use('/api', createUserRouter);
app.use('/api', loginUserRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
