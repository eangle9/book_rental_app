const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const pool = require("./config/db");
const userRoute = require("./routes/userRoute");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use("/api/users", userRoute);

// centeral error handler
app.use(notFound);
app.use(errorHandler);

pool.on("connect", () => {
  console.log("Connected to the PostgreSQL database");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
