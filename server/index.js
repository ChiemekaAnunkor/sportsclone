import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";

//initialize express
const app = express();
dotenv.config();

//setup bodyparser to send request,
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//enable cross origin request
app.use(cors());

//use express middleware to connect to our application
app.use("/posts", postRoutes);
// const CONNECTION_URL = process.env.CONNECTION_URL;
const CONNECTION_URL =
  "mongodb+srv://admin:admin123@stathlete.pqvmrfg.mongodb.net/?retryWrites=true&w=majority";

//connect to our mongo db database
const PORT = process.env.PORT || 5000;

//connect to mongodb, then listen on ports if not throw error message
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

// mongoose.set("useFindAndModify", false);
