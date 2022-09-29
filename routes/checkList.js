const express = require("express");
const router = express.Router();
const { CheckList } = require("../models/CheckList");

// # 체크리스트 post
router.post("/post", (req, res) => {
  const post = new CheckList(req.body);

  post.save((err, text) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

// # 체크리스트 get
router.get("/:id", async (req, res, next) => {
  try {
    const checkList = await CheckList.find({ writer: req.params.id }).populate(
      "writer"
    );
    console.log(checkList);
    res.json(checkList);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// # 체크리스트 삭제
router.delete("/:id", (req, res, next) => {
  CheckList.deleteOne({ _id: req.params.id })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});
// # 체크리스트 업데이트
router.patch("/:id", (req, res, next) => {
  CheckList.updateOne(
    { _id: req.params.id },
    { content: req.body.content, checked: req.body.checked }
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
