const { check } = require("express-validator");
const express = require("express");
const { QueryAPI } = require("../model/database.js");
const { JsonResponse } = require("../util/utils");

const app = express();

app.get(
	"/api/get-scores",
	[
		check('username').isLength({ min: 5, max: 30 }).isAlphanumeric().trim().escape(),
	],
	async (req, res) => {
		const username = req.query['username'];
		const limit = 10;
		let isList = username === undefined;
		let jsonResponse = new JsonResponse();
		let query = new QueryAPI();
		query = query.Select(['*'], 'scoreboard');
		if (!isList) {
			query = query.Where('username = ?', [username])
		} else {
			query = query.OrderBy({
				'score': QueryAPI.OrderBy.DESC,
				'username': QueryAPI.OrderBy.ASC
			})
				.Limit(limit);
		}
		await query.Execute(
			async (results) => {
				if (results.length) {
					let data = results;
					jsonResponse.setSuccess(
						{
							data: data,
							limit: isList ? limit : 1,
						},
						JsonResponse.code.ok
					);
					return;
				}
				jsonResponse.setFail(
					'Unknown Failure',
					JsonResponse.code.badRequest
				);
			},
			async (error) => {
				jsonResponse.setError(
					error,
					JsonResponse.code.internalServerError
				);
			}
		);
		res.status(jsonResponse.getCode()).json(jsonResponse.formJson());
	}
);

module.exports.getScores = app;