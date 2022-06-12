require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

//DB
const connectDB = require("./db/connect");

const fileUpload = require("express-fileupload");

//routers
const productRouter = require("./routes/productRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const authRouter = require("./routes/authRoutes");


//middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const { requireAuth } = require("./middleware/authentication");

app.use(express.json());
app.use(express.static("./public"));
app.use(fileUpload());
app.use(cookieParser());

app.use("/api/v1/products",[requireAuth],productRouter);
app.use("/api/v1/categories", [requireAuth],categoryRouter);
app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`server is listening on port: ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
