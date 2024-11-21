import axios from 'axios';
import { useEffect, useState } from 'react';
import CatLeaderboardCard from './CatLeaderboardCard';

export default function Leaderboard() {
	const [cats, setCats] = useState<{}[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		setIsLoading(true);
		axios
			.get('http://localhost:9090/api/cats') // Connect to table that has info
			.then((response) => {
				// Calculate score using info (location_history probably)
				setIsLoading(false);
				setCats(response.data.data); // Set cats info and score to then map through
			})
			.catch((err: Error) => {
				setIsLoading(false);
				setError(`${err}`);
			});
	}, []);

	return (
		<section>
			{isLoading && <p>Loading...</p>}
			{error && <p>{error}</p>}

			<ul>
				{cats.map((cat) => {
					return <CatLeaderboardCard key={cat.device_id} cat={cat} />;
				})}
			</ul>
		</section>
	);
}
