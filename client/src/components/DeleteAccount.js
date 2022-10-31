import classes from "./LoginForm.module.scss";
import passwordIcon from "../assets/carbon_password.svg";
import Layout from "./Layout";
import Input from "./Input";
import axios from "axios";
import JsonResponseCodes from './JsonResponseCodes';
import Page from "./Page";


class DeleteAccount extends Page {
	constructor(props) {
		super(props);
		this.state['password'] = '';
		if (!this.state.isLoggedIn) {
			window.location.href = '/login';
		}
	}

	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value });
	}

	deleteAccount = (event) => {
		event.preventDefault();
		const { password, token } = this.state;
		const username = this.state.userData.username;
		axios.delete(
			'/api/delete-account',
			{
				headers: {
					'authorization': `Bearer ${token}`
				},
				data: {
					username: username,
					password: password,
				}
			}
		).then(response => {
			if (response.status === JsonResponseCodes.ok) {
				window.localStorage.removeItem('state');
				window.location.href = '/signup';
			}
		}).catch(error => {
			console.log(error);
		})
	}

	render() {
		return (
			<Layout>
				<div>
					<h1>
						Confirm Deletion
					</h1>
					<form onSubmit={this.deleteAccount} className={classes.form}>
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
							Delete My Account
						</button>
					</form>
					<a href='/dashboard'>Cancel</a>
					<br />
					<br />
				</div>
			</Layout>
		);
	}
}

export default DeleteAccount;