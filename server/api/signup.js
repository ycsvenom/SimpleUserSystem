const { check } = require("express-validator");
const express = require("express");
const { QueryAPI } = require("../model/database.js");
const { JsonResponse, getHashedPassword, generateId } = require("../util/utils");

const app = express();

app.post(
	"/api/signup",
	[
		check('fname').isLength({ min: 3, max: 20 }).isAlpha().trim().escape(),
		check('lname').isLength({ min: 3, max: 20 }).isAlpha().trim().escape(),
		check('username').isLength({ min: 5, max: 30 }).isAlphanumeric().trim().escape(),
		check('email').isLength({ min: 6, max: 50 }).isEmail().trim().escape(),
		check('password').isLength({ min: 6, max: 32 }).isAscii().escape()
	],
	async (req, res) => {
		const { fname, lname, username, email, password } = req.body;
		let jsonResponse = new JsonResponse();
		const { hashedPassword, salt } = getHashedPassword(password);
		let id = generateId(username, email, hashedPassword, salt);
		let query = new QueryAPI();
		let hasCreatedAccount = false;
		await query.Insert(
			{
				id: id,
				fname: fname,
				lname: lname,
				username: username,
				email: email,
				password: hashedPassword,
				salt: salt
			},
			'users'
		)
			.Execute(
				function (results) {
					if (results) {
						jsonResponse.setSuccess(
							{},
							JsonResponse.code.ok
						);
						hasCreatedAccount = true;
					}
					else {
						jsonResponse.setError(
							'Account Creation failed, Canceled',
							JsonResponse.code.internalServerError
						);
					}
				},
				function (error) {
					jsonResponse.setError(
						'Account Creation failed',
						JsonResponse.code.internalServerError
					);
				}
			);
		if (hasCreatedAccount)
			await query.Insert(
				{
					username: username,
					score: 0,
				},
				'scoreboard'
			)
				.Execute(
					async (results) => { },
					async (error) => {
						jsonResponse.setError(
							"Couldn't register score",
							JsonResponse.code.internalServerError
						);
					}
				)
		res.status(jsonResponse.getCode()).json(jsonResponse.formJson());
	});

module.exports.signup = app;