require("dotenv").config();
const express = require("express");
const userRouter = require("./routes/userRoutes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Home route");
});

app.use("/api/v1/users", userRouter);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
