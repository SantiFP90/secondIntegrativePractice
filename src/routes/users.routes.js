import { Router } from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import { clearCookie } from "../utils/utils.js";

const router = Router();

router.use(cookieParser());

router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  (req, res) => {
    res
      .cookie("coderCookieToken", req.user, { httpOnly: true })
      .send({ status: "success", message: "cookie set" });
  }
);

router.post(
  "/register",
  passport.authenticate("register", { session: false }),
  (req, res) => {
    res.send({ status: "success" });
  }
);

router.get(
  "/current",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    res.send(req.user.user);
  }
);

router.post(
  "/logout",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    clearCookie(res);
    res.redirect("/login");
  }
);

export default router;
