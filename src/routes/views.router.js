import { Router } from "express";
import passport from "passport";
import cookieParser from "cookie-parser";

const router = Router();

router.use(cookieParser());

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

// router.get("/reset", (req, res) => {
//   res.render("reset");
// });

router.get(
  "/profile",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    res.render("profile", {
      user: req.user.user,
    });
  }
);

export default router;
