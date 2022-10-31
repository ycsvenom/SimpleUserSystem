import { Component } from "react";
import classes from "./LoginForm.module.scss";
import Layout from "./Layout";


class Dashboard extends Component {
	constructor(props) {
		super(props);
		let localState;
		try {
			let localStorage = window.localStorage.getItem('state') || '{ isLoggedIn: false, userData: {} }';
			localState = JSON.parse(localStorage);
		} catch (error) {
			localState = { isLoggedIn: false, userData: {} }
		}
		const { isLoggedIn, userData } = localState;
		this.state = {
			isLoggedIn: isLoggedIn,
			userData: userData
		}
		if (!this.state.isLoggedIn) {
			window.location.href = '/login';
		}
	}

	logOut = () => {
		window.localStorage.removeItem('state');
		window.location.href = './login';
	}

	deleteAccount = () => {
		window.location.href = './settings/delete-account';
	}

	render() {
		return (
			<Layout>
				<div>
					<h1>
						Welcome {this.state.userData.username}
					</h1>
					<button
						className={classes.loginBtn}
						onClick={this.logOut}
					>
						Log out
					</button>
					<button
						className={classes.loginBtn}
						onClick={this.deleteAccount}
					>
						Delete Account
					</button>
				</div>
			</Layout>
		);
	}
}

export default Dashboard;