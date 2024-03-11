import express from "express";

import dotenv from "dotenv";

import connectDB from "./config/db.js";

import cors from "cors";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import jobsRoute from "./routes/jobsRoute.js";
import errorMidddleware from "./middleware/error.js";
// dot env config
dotenv.config();

// mongodb connection
connectDB();

const app = express();
//middleware
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/job", jobsRoute);
console.log("hello");

//validation middleware
app.use(errorMidddleware);
app.use((req, res) => {
  res.status(404).send({ msg: "Resource not found" });
});

//port
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `My server started in ${process.env.DEV_MODE} mode on port no ${PORT}`
  );
});
