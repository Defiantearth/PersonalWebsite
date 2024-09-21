if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const router = express.Router();
const path = require("path");
router.use(express.json());
const bcrypt = require("bcrypt");
const flash = require("express-flash");
const methodOverride = require("method-override");
const passport = require("passport");
const session = require("express-session");
//var email = "null";

//Database import
const query = require("../SQL/query.js");

router.use(flash());
router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
router.use(passport.initialize());
router.use(passport.session());
router.use(methodOverride("_method"));

//using passport
const initializePassport = require("../passport-config");
initializePassport(
  passport,
  (email) => getUserByEmail(email),
  (id) => getUserById(id)
);

async function getUserByEmail(email) {
  let user = (
    await query(`select * from blackjack where email = '${email}'`)
  )[0];

  return user;
}

async function getUserById(id) {
  let user = (await query(`select * from blackjack where ID = '${id}'`))[0];
  return user;
}

router.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    //connect to database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    query(
      `insert into blackJack(email, password, name, chipAmount) values('${req.body.email}', '${hashedPassword}', '${req.body.name}', 100)`
    );

    res.redirect("/BlackJack/BlackJackLogin");
  } catch {
    res.redirect("/register");
  }
});

//problem lies here

router.post(
  "/BlackJackLogin",
  passport.authenticate("local", {
    successRedirect: "/BlackJack",
    failureRedirect: "/BlackJack/BlackJackLogin",
    failureFlash: true,
  })
);

router.delete("/logout", (req, res) => {
  req.logOut();
  req.redirect("/login");
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/BlackJackLogin");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

router.get("/chipAmount", async (req, res) => {
  var playersChips = await getUserById(req.session.passport.user);
  playersChips = playersChips.chipamount;
  console.log(playersChips);
  res.json({
    success: true,
    data: playersChips,
  });
});

router.post("/chipAmount", (req, res) => {
  let data = req.body.chips;
  console.log(data);
  query(
    `update blackJack set chipamount = ${req.body.chips} where id = '${req.session.passport.user}'`
  );
});

module.exports = router;
