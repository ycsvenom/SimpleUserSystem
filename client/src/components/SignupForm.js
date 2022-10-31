import React, { Component } from "react";
import classes from "./LoginForm.module.scss";
import usernameIcon from "../assets/akar-icons_person.svg";
import passwordIcon from "../assets/carbon_password.svg";
import axios from 'axios'
import Input from "./Input";
import JsonResponseCodes from './JsonResponseCodes';


class SignupForm extends Component {
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
			fname: '',
			lname: '',
			username: '',
			email: '',
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
		const { fname, lname, username, email, password } = this.state;
		axios.post(
			'/api/signup',
			{
				fname: fname,
				lname: lname,
				username: username,
				email: email,
				password: password,
			}).then(response => {
				if (response.status === JsonResponseCodes.ok) {
					let localState = {
						isLoggedIn: false,
						userData: {}
					};
					window.localStorage.setItem('state', JSON.stringify(localState));
					window.location.href = '/login';
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
						imgAlt="fname icon"
						imgHtmlFor="fname"
						inputClass={classes.input}
						inputType="text"
						inputId="fname"
						inputName="fname"
						inputAutoComplete="on"
						inputPlaceholder="First name"
						inputValue={this.state.fname}
						inputOnChange={this.handleUserInput}
						// ref={emailInputRef}
						inputRequired={true}
					>
					</Input>
					<Input
						imgClass={classes.icon}
						imgSrc={usernameIcon}
						imgAlt="lname icon"
						imgHtmlFor="lname"
						inputClass={classes.input}
						inputType="text"
						inputId="lname"
						inputName="lname"
						inputAutoComplete="on"
						inputPlaceholder="Last name"
						inputValue={this.state.lname}
						inputOnChange={this.handleUserInput}
						// ref={emailInputRef}
						inputRequired={true}
					>
					</Input>
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
						imgSrc={usernameIcon}
						imgAlt="email icon"
						imgHtmlFor="email"
						inputClass={classes.input}
						inputType="email"
						inputId="email"
						inputName="email"
						inputAutoComplete="on"
						inputPlaceholder="Email"
						inputValue={this.state.email}
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
						Signup
					</button>
				</form>
				<a href='/login'>Already have an account?</a>
				<br />
				<br />
			</div>
		);
	}
}

export default SignupForm;