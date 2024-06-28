import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routers.js';

const app = express();
const port = 5050;

app.use(cors({
  origin: true,
  methods: ["PUT", "DELETE", "POST", "GET"],
  credentials: true
}));
app.use(bodyParser.json());
app.use('/', router)


//url

const dbURI = 'mongodb+srv://rahulgangwar22:Pcs6QGJe8GOObB59@cluster0.sbksrzf.mongodb.net/Gofoodmern?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
