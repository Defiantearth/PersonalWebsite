const express = require("express");
const app = express();
const path = require("path");

app.use("/", express.static("public/Home"));
app.use("/AboutMe", express.static("public/AboutMe"));
app.use("/BlackJack", express.static("public/BlackJack"));
app.use("/BlackJack/BlackJackLogin", express.static("public/BlackJackLogin"));
app.use("/BlackJack/Register", express.static("public/Register"));

//routes
const blackjackRouter = require("./routes/blackjack.js");

//app.use(express.static("./Home"));
app.use(express.urlencoded({ extended: true }));

app.use("/BlackJack", blackjackRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("port is listening on port 5000...");
});
