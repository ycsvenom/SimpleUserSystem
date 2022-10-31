import { Component } from "react";

class Page extends Component {
	constructor(props, isLogInRequired) {
		super(props);
		let localState;
		try {
			let localStorage = window.localStorage.getItem('state') || '{ isLoggedIn: false, userData: {} }';
			localState = JSON.parse(localStorage);
		} catch (error) {
			localState = { isLoggedIn: false, userData: {}, token: '', score: 0 };
		}
		const { isLoggedIn, userData, token, score } = localState;
		this.state = {
			isLoggedIn: isLoggedIn,
			userData: userData,
			token: token,
			score: score
		}
		if (isLogInRequired && !this.state.isLoggedIn)
			window.location.href = '/login';
		if (!isLogInRequired && this.state.isLoggedIn)
			window.location.href = '/dashboard';
	}
}

export default Page;