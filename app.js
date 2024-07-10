const express = require("express");
const app = express();
const path = require("path");

app.use("/", express.static("public/Home"));
app.use("/BlackJack", express.static("public/BlackJack"));
app.use("/BlackJack/BlackJackLogin", express.static("public/BlackJackLogin"));
app.use("/BlackJack/Register", express.static("public/Register"));

//routes
const blackjackRouter = require("./routes/blackjack.js");

//app.use(express.static("./Home"));
app.use(express.urlencoded({ extended: true }));

app.use("/BlackJack", blackjackRouter);

app.listen(5000, () => {
  console.log("port is listening on port 5000...");
});
