import classes from "./LoginForm.module.scss";
import Layout from "./Layout";
import axios from 'axios'
import Page from "./Page";

const operators = '+-*';

class MathGame extends Page {
	constructor(props) {
		super(props);
		this.state = {
			...this.state,
			score: 0,
			result: 0,
			equation: ''
		};
		if (!this.state.isLoggedIn) {
			window.location.href = '/login';
		}
		this.generateEquation();
	}

	generateEquation = () => {
		let level = Math.pow(10, Math.floor(this.state.score / 50) + 1);
		let operand1 = Math.floor(Math.random() * level) + 1;
		let operand2 = Math.floor(Math.random() * level) + 1;
		if (operand2 > operand1)
			[operand1, operand2] = [operand2, operand1];
		let operator = operators[Math.floor(Math.random() * operators.length)];
		this.state.equation = `${operand1} ${operator} ${operand2}`;
	}

	handleUserInput = (e) => {
		const name = e.target.name;
		let value = e.target.value;
		value = value.replace(/\D/g, '');
		if (value === '')
			value = 0;
		value = parseInt(value);
		this.setState({ [name]: value });
	}

	submitHandler = (event) => {
		event.preventDefault();
		const { username, } = this.state.userData;
		const { equation, result, token } = this.state;
		if (eval(equation) == parseInt(result)) {
			this.generateEquation();
			this.state.score += 5;
		}
		this.setState({
			score: this.state.score,
			result: 0
		});
		axios(
			'/api/math-game-score',
			{
				method: 'PUT',
				headers: {
					'authorization': `Bearer ${token}`,
				},
				data: {
					username: username,
					score: this.state.score,
				}
			})
			.then(response => { })
			.catch(error => {
				console.log(error);
			})
	};

	render() {
		return (
			<Layout>
				<div>
					<h1>
						your Score is {this.state.score}
					</h1>
					<h2>
						{this.state.equation} = ?
					</h2>
					<form onSubmit={this.submitHandler}>
						<input
							className={classes.input}
							type="text"
							id="result"
							name="result"
							autoComplete="off"
							placeholder="result"
							value={this.state.result}
							onChange={this.handleUserInput}
						></input>
						<button
							className={classes.loginBtn}
							onClick={this.gotoMathGame}
						>
							Answer
						</button>
					</form>
				</div>
				<br />
				<a href='/dashboard'>Return to dashboard</a>
			</Layout>
		);
	}
}

export default MathGame;