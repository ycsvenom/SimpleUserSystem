const crypto = require('crypto');
const randomBytes = require('crypto').randomBytes;

class JsonResponse {
	static status = {
		success: 'success',
		fail: 'fail',
		error: 'error'
	}

	static code = {
		ok: 200,
		badRequest: 400,
		unauthorized: 401,
		internalServerError: 500,
	}

	constructor() {
		this.status = JsonResponse.status.fail;
		this.code = JsonResponse.code.badRequest;
		this.message = 'Unknown error';
		this.data = {}
		this.token = undefined;
	}

	setStatus(status) {
		this.status = status;
	}

	getStatus() {
		return this.status;
	}

	setCode(code) {
		this.code = code;
	}

	getCode() {
		return this.code;
	}

	setMessage(message) {
		this.message = message;
	}

	getMessage() {
		return this.message;
	}

	setData(data) {
		this.data = data;
	}

	getData() {
		return this.data;
	}

	setToken(token) {
		this.token = token;
	}

	getToken() {
		return this.token;
	}

	setSuccess(data, code) {
		this.status = JsonResponse.status.success;
		this.data = data;
		this.code = code;
	}

	setError(message, code) {
		this.status = JsonResponse.status.error;
		this.message = message;
		this.code = code;
	}

	setFail(message, code) {
		this.status = JsonResponse.status.fail;
		this.message = message;
		this.code = code;
	}


	formJson() {
		let jsonResponse = {
			status: this.status,
			message: this.message,
			data: this.data,
			code: this.code
		};
		if (this.status === JsonResponse.status.success) {
			delete jsonResponse['message'];
			if (typeof this.token !== 'undefined')
				jsonResponse.token = this.token;
		}
		else
			delete jsonResponse['data'];
		return jsonResponse;
	}
}

const generateSalt = () => randomBytes(16).toString('base64');

const sha512 = (str) => {
	var hash = crypto.createHash('sha512');
	data = hash.update(str, 'utf-8');
	gen_hash = data.digest('hex');
	return gen_hash;
}

const generateId = (username, email, password, salt) => {
	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}
	let box = [username, email, password, salt].map(str => sha512(str));
	shuffleArray(box);
	return box.reduce(
		(t, e) => {
			let randomIndex = Math.floor(Math.random() * (e.length - 4));
			let randomSlice = e.substring(randomIndex, randomIndex + 4);
			return t + randomSlice;
		},
		''
	);
}

const deleteKeys = (array, keys) => {
	keys.forEach(element => {
		delete array[element];
	});
}

const getHashedPassword = (password, salt = undefined) => {
	if (salt === undefined)
		salt = generateSalt();
	let hashedPassword = sha512(password + salt);
	return { hashedPassword, salt };
}

module.exports = {
	generateId: generateId,
	JsonResponse: JsonResponse,
	deleteKeys: deleteKeys,
	getHashedPassword: getHashedPassword,
	generateSalt: generateSalt
}