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
initializePassport(passport, getUserByEmail(email));

async function getUserByEmail(email) {
  console.log(email);
  let user = await query(`select * from blackjack where email = '${email}'`);
  console.log(user);
}

//BlackJack Page
// router.get("/BlackJackLogin", (req, res) => {
//   console.log("Hello");
// });

router.post("/register", async (req, res) => {
  try {
    //connect to database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    query(
      `insert into blackJack values('${req.body.email}', '${hashedPassword}', '${req.body.name}', 100)`
    );

    res.redirect("/BlackJack/BlackJackLogin");
  } catch {
    res.redirect("/register");
  }
});

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

// router.post("/BlackJackLogin", async (req, res) => {
//   userName = req.body.userName;
//   try {
//     playerChips = await query(
//       `select chipAmount from blackJack where userName = '${req.body.userName}'`
//     );
//     playerChips = playerChips.recordset[0].chipAmount;
//   } catch (err) {
//     playerChips = 1000;
//     await query(`insert into blackJack values('${req.body.userName}', 100)`);
//     console.log(`New User Created under name ${req.body.userName}`);
//   }
//   console.log(playerChips);
//   res.redirect("/BlackJack");
// });

// router.post("/BlackJackLogin", async (req, res) => {
//   userName = req.body.userName;
//   try {
//     playerChips = await query(
//       `select chipAmount from blackJack where userName = '${req.body.userName}'`
//     );
//     playerChips = playerChips.recordset[0].chipAmount;
//   } catch (err) {
//     playerChips = 1000;
//     await query(`insert into blackJack values('${req.body.userName}', 100)`);
//     console.log(`New User Created under name ${req.body.userName}`);
//   }
//   console.log(playerChips);
//   res.redirect("/BlackJack");
// });

// router.get("/chipAmount", (req, res) => {
//   res.json({ success: true, data: playerChips });
// });

// router.post("/chipAmount", (req, res) => {
//   let data = req.body.chips;
//   console.log(data);
//   query(
//     `update blackJack set chipAmount = ${req.body.chips} where userName = '${userName}'`
//   );
// });

module.exports = router;
