const express = require("express");
const router = express.Router();
const { Dday } = require("../models/Dday");

// # 디데이 post
router.post("/post", (req, res) => {
  const post = new Dday(req.body);

  post.save((err, text) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

// # 디데이 get
router.get("/:id", async (req, res, next) => {
  try {
    const dDay = await Dday.find({ writer: req.params.id }).populate("writer");
    console.log(dDay);
    res.json(dDay);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// # 디데이 삭제
router.delete("/:id", (req, res, next) => {
  Dday.deleteOne({ _id: req.params.id })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});
// # 디데이 업데이트
router.patch("/:id", (req, res, next) => {
  Dday.updateOne(
    { _id: req.params.id },
    { title: req.body.title, date: req.body.date, dDay: req.body.dDay }
  )
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;
