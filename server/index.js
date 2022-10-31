// server/index.js
const express = require("express");
const bodyParser = require("body-parser");
const { JsonWebTokensHolder } = require("./util/tokens");

const jwtHolder = new JsonWebTokensHolder();

module.exports = {
	jwtHolder: jwtHolder,
};

const { signup } = require("./api/signup.js");
const { login } = require("./api/login.js");
const { deleteAccount } = require("./api/delete-account.js");
const { mathGameScore } = require("./api/math-game-score.js");
const { getScores } = require("./api/get-scores.js");

const PORT = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(signup);
app.use(login);
app.use(deleteAccount);
app.use(mathGameScore);
app.use(getScores);


app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

