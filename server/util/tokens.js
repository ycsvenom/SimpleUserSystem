const jwt = require("jsonwebtoken")
const generateSecretKey = require('./utils').generateSalt;

class JsonWebTokensHolder {
	constructor() {
		this.users = {};
	}

	createToken = async (username, userData) => {
		const secretKey = generateSecretKey();
		this.users[username] = secretKey;
		return new Promise((res, rej) => {
			jwt.sign({ data: userData }, secretKey, (err, token) => err ? rej(undefined) : res(token));
		});
	}

	isAuthorized = async (username, token) => {
		if (username in this.users) {
			let secretKey = this.users[username];
			return new Promise((res, rej) => {
				jwt.verify(token, secretKey, (err, authData) => err ? rej(undefined) : res(authData));
			});
		} else
			return undefined;
	}

	static verifyToken = (req, res, next) => {
		const bearerHeader = req.headers['authorization'];
		if (typeof bearerHeader !== 'undefined') {
			const bearer = bearerHeader.split(' ');
			const bearerToken = bearer[1];
			req.token = bearerToken;
			next();
		} else {
			res.sendStatus(403);
		}
	}
}

exports.JsonWebTokensHolder = JsonWebTokensHolder;