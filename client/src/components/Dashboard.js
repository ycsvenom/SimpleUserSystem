import classes from "./LoginForm.module.scss";
import Layout from "./Layout";
import JsonResponseCodes from './JsonResponseCodes';
import Page from "./Page";
import axios from 'axios';

class Dashboard extends Page {
	constructor(props) {
		super(props, true);
	}

	logOut = () => {
		window.localStorage.removeItem('state');
		window.location.href = './login';
	}

	gotoMathGame = () => {
		window.location.href = './math-game';
	}

	gotoScoreboards = () => {
		window.location.href = './scoreboard';
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
				const data = response.data.data.data[0];
				if (response.status === JsonResponseCodes.ok) {
					this.setState({ score: data.score });
					let localState = {
						isLoggedIn: this.state.isLoggedIn,
						userData: this.state.userData,
						token: this.state.token,
						score: this.state.score
					}
					window.localStorage.setItem('state', JSON.stringify(localState));
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
						Welcome {this.state.userData.username} your score is {this.state.score}
					</h1>
					<button
						className={classes.loginBtn}
						onClick={this.gotoMathGame}
					>
						Play math game
					</button>
					<button
						className={classes.loginBtn}
						onClick={this.gotoScoreboards}
					>
						Scoreboards
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
				<br />
				<br />
				<br />
			</Layout>
		);
	}
}

export default Dashboard;