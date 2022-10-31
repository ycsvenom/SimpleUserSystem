import './Scoreboard.css';
import axios from 'axios';
import JsonResponseCodes from './JsonResponseCodes';
import Page from './Page';
import Layout from './Layout';
// Example of a data array that
// you might receive from an API


class Scoreboard extends Page {
	constructor(props) {
		super(props, true);
		this.state.data = [];
	}

	componentDidMount = () => {
		axios.get(
			'/api/get-scores',
			{
			}).then(response => {
				const scores = response.data.data.data;
				if (response.status === JsonResponseCodes.ok) {
					this.setState({ data: scores });
				}
			}).catch(error => {
				console.log(error);
			})
	}

	render() {
		const { username } = this.state.userData;
		return (
			<Layout>
				<h1>
					Scoreboards
				</h1>
				<div className="App" >
					<table>
						<thead>
							<tr>
								<th><h3>Username</h3></th>
								<th><h3>Score</h3></th>
							</tr>
						</thead>
						<tbody>
							{this.state.data.map((val) => {
								return (
									<tr key={val.username}>
										{/* <td>{val.username}</td>
							<td>{val.score}</td> */}
										<td>
											<h5 className={username === val.username ? 'my-username' : ''}>
												{val.username}
											</h5>
										</td>
										<td>
											<h5 className={username === val.username ? 'my-username' : ''}>
												{val.score}
											</h5>
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
				<a href='/dashboard'>Go back to Dashboard</a>
				<br />
				<br />
			</Layout>
		);
	}
}

export default Scoreboard;
