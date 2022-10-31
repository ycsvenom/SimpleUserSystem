var mysql = require('mysql2/promise');

const config = {
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: '',
	database: 'usersystem',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
}

const pool = mysql.createPool(config);

class QueryAPI {
	#finalQuery;
	static OrderBy = {
		ASC: 'ASC',
		DESC: 'DESC',
	}

	constructor() {
		this.#finalQuery = ''
	};

	async #query(callback, fallback) {
		console.log(this.#finalQuery);
		await pool.getConnection()
			.then(conn => {
				const res = conn.query(this.#finalQuery);
				conn.release();
				return res;
			}).then(result => {
				callback(result[0])
			}).catch(err => {
				fallback(err)
			})
	}

	#setFinalQuery(query) {
		this.#finalQuery = query;
	}

	#getFinalQuery() {
		return this.#finalQuery;
	}

	#createFeedback() {
		let feedback = new QueryAPI();
		feedback.#setFinalQuery(this.#getFinalQuery());
		return feedback;
	}

	Select(attrs, table) {
		let attributes = attrs.map(attr => attr === '*' ? `${attr}` : `\`${attr}\``).join(', ');
		this.#finalQuery = `SELECT ${attributes} FROM \`${table}\``;
		this.#finalQuery = this.#finalQuery.replace('${attributes}', `${attributes}`);
		this.#finalQuery = this.#finalQuery.replace('${table}', `\`${table}\``);
		return this.#createFeedback();
	}

	Where(clause, values) {
		values.forEach(val => {
			clause = clause.replace(`?`, isNaN(val) ? `"${val}"` : `${val}`);
		});
		this.#finalQuery += ` WHERE ${clause};`;
		return this.#createFeedback();
	}

	Delete(clause, values, table) {
		values.forEach(val => {
			clause = clause.replace(`?`, isNaN(val) ? `"${val}"` : `${val}`);
		});
		this.#finalQuery = `DELETE FROM ${table} WHERE ${clause}`;
		return this.#createFeedback();
	}

	Update(keyvalue, clause, clauseValues, table) {
		let genClause = Object.keys(keyvalue).map(key => `\`${key}\` = ?`).join(', ');
		Object.values(keyvalue).forEach(val => {
			genClause = genClause.replace(`?`, isNaN(val) ? `"${val}"` : `${val}`);
		});
		clauseValues.forEach(val => {
			clause = clause.replace(`?`, isNaN(val) ? `"${val}"` : `${val}`);
		});
		this.#finalQuery = `UPDATE ${table} SET ${genClause} WHERE ${clause}`;
		return this.#createFeedback();
	}

	Insert(keyvalue, table) {
		let attributes = Object.keys(keyvalue).map(attr => `\`${attr}\``).join(', ');
		let attrsValues = Object.values(keyvalue).map(val => isNaN(val) ? `"${val}"` : `${val}`).join(', ');
		this.#finalQuery = `INSERT INTO \`${table}\` (${attributes}) VALUES (${attrsValues})`;
		return this.#createFeedback();
	}

	Limit(n) {
		this.#finalQuery += ` LIMIT ${n}`;
		return this.#createFeedback();
	}

	// keyvalue pair of columns and ordering which will mixed inside
	OrderBy(keyvalue) {
		let genOrder = Object.keys(keyvalue).map(key => `\`${key}\` ?`).join(', ');
		Object.values(keyvalue).forEach(val => {
			genOrder = genOrder.replace(`?`, `${val}`);
		});
		this.#finalQuery += ` ORDER BY ${genOrder}`;
		return this.#createFeedback();
	}

	async Execute(callback, fallback) {
		await this.#query(callback, fallback);
	}

};

module.exports.QueryAPI = QueryAPI;