const express = require("express");
const router = express.Router();
const { Diary } = require("../models/Diary");

// # 다이어리 post
router.post("/post", (req, res) => {
  const post = new Diary(req.body);

  post.save((err, text) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

// # 다이어리 get
router.get("/:id", async (req, res, next) => {
  try {
    const diary = await Diary.find({ commenter: req.params.id }).populate(
      "commenter"
    );
    console.log(diary);
    res.json(diary);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// # 다이어리 삭제
router.delete("/:id", (req, res, next) => {
  Diary.deleteOne({ _id: req.params.id })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});
// # 다이어리 업데이트
router.patch("/:id", (req, res, next) => {
  Diary.update({ _id: req.params.id }, { content: req.body.content })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;
