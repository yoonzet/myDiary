const express = require("express");
const router = express.Router();
const { Calendar } = require("../models/Calendar");

// # post
router.post("/post", (req, res) => {
  const post = new Calendar(req.body);

  post.save((err, text) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

// # get
router.get("/:id", async (req, res, next) => {
  try {
    const calendar = await Calendar.find({ writer: req.params.id }).populate(
      "writer"
    );
    console.log(calendar);
    res.json(calendar);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// # 삭제
router.delete("/:id", (req, res, next) => {
  Calendar.deleteOne({ _id: req.params.id })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});
// # 업데이트
router.patch("/:id", (req, res, next) => {
  Calendar.updateOne({ _id: req.params.id }, { title: req.body.title })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;
