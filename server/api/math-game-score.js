const { check } = require("express-validator");
const express = require("express");
const { JsonWebTokensHolder } = require("../util/tokens.js");
const { jwtHolder } = require('../index.js');
const { QueryAPI } = require("../model/database.js");
const { JsonResponse } = require("../util/utils");

const app = express();

app.put(
	"/api/math-game-score",
	[
		check('username').isLength({ min: 5, max: 30 }).isAlphanumeric().trim().escape(),
		JsonWebTokensHolder.verifyToken
	],
	async (req, res) => {
		const { username, score } = req.body;
		let jsonResponse = new JsonResponse();
		let query = new QueryAPI();
		let authData = await jwtHolder.isAuthorized(username, req.token);
		if (authData) {
			let hasToUpdate = false;
			let withoutErrors = true;
			await query.Select(['score'], 'scoreboard')
				.Where('username = ?', [username])
				.Execute(
					async (results) => {
						if (results.length && results[0]) {
							let data = results[0]['score'];
							if (score > data)
								hasToUpdate = true;
							jsonResponse.setSuccess(
								{},
								JsonResponse.code.ok
							);
						} else
							hasToUpdate = true;
					},
					async (error) => {
						withoutErrors = false;
						jsonResponse.setError(
							error,
							JsonResponse.code.internalServerError
						);
					}
				);
			if (hasToUpdate && withoutErrors)
				await query.Update(
					{ score: score },
					'username = ?',
					[username],
					'scoreboard'
				).Execute(
					async (results) => {
						jsonResponse.setSuccess(
							{},
							JsonResponse.code.ok
						);
					},
					async (err) => {
						jsonResponse.setError(
							'Unknown Error occurred',
							JsonResponse.code.internalServerError
						);
					}
				);
		}
		res.status(jsonResponse.getCode()).json(jsonResponse.formJson());
	}
);

module.exports.mathGameScore = app;