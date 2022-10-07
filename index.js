require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
//const helmet = require("helmet");

const app = express();

const skillsRouter = require("./src/routes/skills");
const experienceRouter = require("./src/routes/experience");
// const paymentRouter = require("./src/routes/payment");
// const transaksiRouter = require("./src/routes/transaksi");
const UserRouter = require("./src/routes/users");
// const transaksi_detailRouter = require("./src/routes/transaksi_detail");
const host = process.env.DB_HOST;
const port = process.env.PORT;
//app.use(restify.bodyParser());

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
//app.use(helmet());
app.use("/img", express.static("./upload"));
app.use("/skills", skillsRouter);
app.use("/experience", experienceRouter);
// app.use("/payment", paymentRouter);
// app.use("/transaksi", transaksiRouter);
// app.use("/transaksi_detail", transaksi_detailRouter);
app.use("/users", UserRouter);

app.all("*", (req, res, next) => {
  next(new createError.NotFound());
});
app.use((err, req, res, next) => {
  const messageError = err.message || "internal server error";
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    message: messageError,
  });
});

app.listen(port, () => {
  console.log(`server running on http://${host}:${port}`);
});
