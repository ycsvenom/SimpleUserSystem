import { Component } from "react";
import classes from "./LoginForm.module.scss";
import usernameIcon from "../assets/akar-icons_person.svg";
import passwordIcon from "../assets/carbon_password.svg";
import axios from 'axios'
import Input from "./Input";

const code = {
	ok: 200,
	badRequest: 400,
	unauthorized: 401,
	internalServerError: 500,
}

class LoginForm extends Component {
	constructor(props) {
		super(props);
		let localState;
		try {
			let localStorage = window.localStorage.getItem('state') || '{ isLoggedIn: false, userData: {} }';
			localState = JSON.parse(localStorage);
		} catch (error) {
			localState = { isLoggedIn: false, userData: {} }
		}
		const { isLoggedIn, userData, token } = localState;
		this.state = {
			username: '',
			password: '',
			isLoggedIn: isLoggedIn,
			userData: userData,
			token: token
		}
		if (this.state.isLoggedIn) {
			window.location.href = '/dashboard';
		}
	}

	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value });
	}

	submitHandler = (event) => {
		event.preventDefault();
		const { username, password } = this.state;
		axios.post(
			'/api/login',
			{
				username: username,
				password: password,
			}).then(response => {
				const data = response.data;
				if (response.status === code.ok) {
					let localState = {
						isLoggedIn: true,
						userData: data.data,
						token: data.token
					};
					window.localStorage.setItem('state', JSON.stringify(localState));
					window.location.href = '/dashboard';
				}
			}).catch(error => {
				console.log(error);
			})
	};

	render() {
		return (
			<div>
				<form onSubmit={this.submitHandler} className={classes.form}>
					<Input
						imgClass={classes.icon}
						imgSrc={usernameIcon}
						imgAlt="Username icon"
						imgHtmlFor="username"
						inputClass={classes.input}
						inputType="text"
						inputId="username"
						inputName="username"
						inputAutoComplete="on"
						inputPlaceholder="Username"
						inputValue={this.state.username}
						inputOnChange={this.handleUserInput}
						// ref={emailInputRef}
						inputRequired={true}
					>
					</Input>
					<Input
						imgClass={classes.icon}
						imgSrc={passwordIcon}
						imgAlt="Password icon"
						imgHtmlFor="password"
						inputClass={classes.input}
						inputType="password"
						inputId="password"
						inputName="password"
						inputAutoComplete="off"
						inputPlaceholder="Password"
						inputValue={this.state.password}
						inputOnChange={this.handleUserInput}
						// ref={passwordInputRef}
						inputRequired={true}
					>
					</Input>
					<button
						className={classes.loginBtn}
					>
						Login
					</button>
				</form>
				<a href='/signup'>Signup here</a>
				<br />
				<br />
			</div>
		);
	}
}

export default LoginForm;