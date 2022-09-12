const express = require("express");
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const router = express.Router();

// # 회원가입 기능

router.post("/register", (req, res) => {
  const user = new User(req.body);

  //.save는 몽고디비 메서드
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      //200은 성공했다는 표시
      success: true,
    });
  });
});

// # 로그인 기능
router.post("/login", (req, res) => {
  // 1. DB에서 요청한 이메일 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    // 2. 이메일 찾으면 비번이 같은지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }
      // 3. 비번이 같다면 토큰생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다. (쿠키, 로컬스토리지 등 중 선택)
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

// # Auth기능
//auth(두번째 파라미터)는 미들웨어역할로 엔드포인트(첫번째 파라미터)를 리퀘스트 받음다음 3번째 파라미터의 콜백함수를 실행하기전에 실행한다.
router.get("/auth", auth, (req, res) => {
  // 미들웨어를 통과 했으므로 Authentication이 true라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    name: req.user.name,
    email: req.user.email,
    lastName: req.user.lastName,
    role: req.user.role,
    image: req.user.image,
  });
});

// # 로그아웃기능
router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

module.exports = router;
