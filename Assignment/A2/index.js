const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
// const env=require("env");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const DBURL = process.env.DatabaseURL;
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected successfully😎");
  })
  .catch((err) => {
    console.log(err, "something went wrong");
  });

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const searchRoutes = require("./routes/searchRoutes");
const aggre=require("./routes/aggRoutes")

app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);
app.use("/search", searchRoutes);
app.use("/aggregation",aggre);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
