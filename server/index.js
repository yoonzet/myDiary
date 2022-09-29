const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const userRouter = require("./routes/users");
const diaryRouter = require("./routes/diary");
const calendarRouter = require("./routes/calendar");
const weeklyRouter = require("./routes/weekly");
const checkListRouter = require("./routes/checkList");
const dDayRouter = require("./routes/dDay");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRouter);
app.use("/api/diary", diaryRouter);
app.use("/api/calendar", calendarRouter);
app.use("/api/weekly", weeklyRouter);
app.use("/api/checkList", checkListRouter);
app.use("/api/dDay", dDayRouter);

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("몽고디비 연결됨"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  //
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}
