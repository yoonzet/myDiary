const express = require("express");
const router = express.Router();
const { Weekly } = require("../models/Weekly");

// # 위클리 post
router.post("/post", (req, res) => {
  const post = new Weekly(req.body);

  post.save((err, text) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

// # 위클리 get
router.get("/:id", async (req, res, next) => {
  try {
    const weekly = await Weekly.find({ writer: req.params.id }).populate(
      "writer"
    );
    console.log(weekly);
    res.json(weekly);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// # 위클리 삭제
router.delete("/:id", (req, res, next) => {
  Weekly.deleteOne({ _id: req.params.id })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});
// # 위클리 업데이트
router.patch("/:id", (req, res, next) => {
  Weekly.updateOne({ _id: req.params.id }, { content: req.body.content })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;
