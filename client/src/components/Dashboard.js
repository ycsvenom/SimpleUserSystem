import classes from "./LoginForm.module.scss";
import Layout from "./Layout";
import JsonResponseCodes from './JsonResponseCodes';
import Page from "./Page";
import axios from 'axios';

class Dashboard extends Page {
	constructor(props) {
		super(props)
		if (!this.state.isLoggedIn) {
			window.location.href = '/login';
		}
	}

	logOut = () => {
		window.localStorage.removeItem('state');
		window.location.href = './login';
	}

	gotoMathGame = () => {
		window.location.href = './math-game';
	}

	deleteAccount = () => {
		window.location.href = './settings/delete-account';
	}

	componentDidMount() {
		const { username } = this.state.userData;
		axios.get(
			'/api/get-scores',
			{
				params: {
					username: username,
				}
			}).then(response => {
				const data = response.data;
				if (response.status === JsonResponseCodes.ok) {
					this.setState({ score: data[0].score });
					let localState = {
						isLoggedIn: this.state.isLoggedIn,
						userData: this.state.userData,
						token: this.state.token,
						score: this.state.score
					}
					window.localStorage.setItem('state', JSON.stringify(localState));
					window.location.href = '/dashboard';
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
						Welcome {this.state.userData.username} your score is 0
					</h1>
					<button
						className={classes.loginBtn}
						onClick={this.gotoMathGame}
					>
						Play math game
					</button>
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