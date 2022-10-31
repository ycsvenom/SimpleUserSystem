const { check } = require("express-validator");
const express = require("express");
const { JsonWebTokensHolder } = require("../util/tokens.js");
const { jwtHolder } = require('../index.js');
const { QueryAPI } = require("../model/database.js");
const { JsonResponse, getHashedPassword } = require("../util/utils");

const app = express();

app.delete(
	"/api/delete-account",
	[
		check('username').isLength({ min: 5, max: 30 }).isAlphanumeric().trim().escape(),
		check('password').isLength({ min: 6, max: 32 }).isAscii().escape(),
		JsonWebTokensHolder.verifyToken
	],
	async (req, res) => {
		const { username, password } = req.body;
		let jsonResponse = new JsonResponse();
		let query = new QueryAPI();
		let authData = await jwtHolder.isAuthorized(username, req.token);
		if (authData) {
			await query.Select(['username', 'password', 'salt'], 'users')
				.Where('username = ?', [authData.data.username])
				.Execute(
					async function (results) {
						const user = results[0];
						const { hashedPassword, salt } = getHashedPassword(password, user['salt']);
						if (user['password'] === hashedPassword) {
							jsonResponse.setSuccess(
								{},
								JsonResponse.code.ok
							);
							await query.Delete('username = ? AND password = ?', [username, hashedPassword], 'users')
								.Execute(
									function (results) { },
									function (error) {
										if (error) {
											jsonResponse.setError(
												'Account Deletion Failed, Unknown Error',
												JsonResponse.code.internalServerError
											);
										}
									}
								);
						}
						else {
							jsonResponse.setFail(
								'Not Authorized to Delete Account',
								JsonResponse.code.unauthorized
							);
						}
					},
					function (error) {
						jsonResponse.setError(
							'Account Deletion Failed',
							JsonResponse.code.internalServerError
						);
					}
				)
		}
		else
			jsonResponse.setFail(
				'Unauthorized User',
				JsonResponse.code.unauthorized
			);
		res.status(jsonResponse.getCode()).json(jsonResponse.formJson());
	});


module.exports.deleteAccount = app;