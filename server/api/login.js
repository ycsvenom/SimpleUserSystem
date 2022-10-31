const { check } = require("express-validator");
const express = require("express");
const { jwtHolder } = require('../index.js');
const { QueryAPI } = require("../model/database.js");
const { JsonResponse, getHashedPassword, deleteKeys } = require("../util/utils");

const app = express();

app.post(
	"/api/login",
	[
		check('username').isLength({ min: 5, max: 30 }).isAlphanumeric().trim().escape(),
		check('password').isLength({ min: 6, max: 32 }).isAscii().escape()
	],
	async (req, res) => {
		const { username, password } = req.body;
		let jsonResponse = new JsonResponse();
		let query = new QueryAPI();
		await query.Select(['*'], 'users')
			.Where('username = ?', [username])
			.Execute(
				async (results) => {
					if (results.length && results[0]) {
						let user = results[0];
						const { hashedPassword, salt } = getHashedPassword(password, user['salt']);
						if (hashedPassword === user['password']) {
							deleteKeys(user, ['password', 'salt']);
							jsonResponse.setSuccess(
								user,
								JsonResponse.code.ok
							);
							return;
						}
					}
					jsonResponse.setFail(
						'Incorrect username / password',
						JsonResponse.code.unauthorized
					);
				},
				(error) => {
					jsonResponse.setError(
						error,
						JsonResponse.code.internalServerError
					);
				}
			);
		let token = await jwtHolder.createToken(username, jsonResponse.getData());
		if (token)
			jsonResponse.setToken(token);
		else
			jsonResponse.setError(
				'Failed Making Session',
				JsonResponse.code.internalServerError
			);
		console.log(jsonResponse);
		res.status(jsonResponse.getCode()).json(jsonResponse.formJson());
	}
);

module.exports.login = app;