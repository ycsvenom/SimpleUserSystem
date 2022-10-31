import './Scoreboard.css';
import axios from 'axios';
import JsonResponseCodes from './JsonResponseCodes';
// Example of a data array that
// you might receive from an API
let data = []

const getData = () => {
	axios.get(
		'/api/get-scores',
		{}).then(response => {
			const scores = response.data;
			if (response.status === JsonResponseCodes.ok) {
				data = scores.data;
			}
		}).catch(error => {
			console.log(error);
		})
}


function Scoreboard() {
	getData();
	return (
		<div className="App">
			<table>
				<tr>
					<th>Username</th>
					<th>Score</th>
				</tr>
				{data.map((val, key) => {
					return (
						<tr key={key}>
							<td>{val.username}</td>
							<td>{val.score}</td>
						</tr>
					)
				})}
			</table>
		</div>
	);
}

export default Scoreboard;
