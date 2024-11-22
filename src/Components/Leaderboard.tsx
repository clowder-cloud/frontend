import axios from 'axios';
import { useEffect, useState } from 'react';
import CatLeaderboardCard from './CatLeaderboardCard';
import calculateLineLength from '../Utils/calculateCatDistance';
import Device from '../Interfaces/Device';

export default function Leaderboard() {
	const [devices, setDevices] = useState<Device[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		setIsLoading(true);
		axios
			.get('http://localhost:9090/api/devices')
			.then((response) => {
				setIsLoading(false);
				setDevices(response.data.data);
			})
			.catch((err: Error) => {
				setIsLoading(false);
				setError(`${err}`);
			});
	}, []);

	const top10DevicesByScore = devices
		.map((device) => ({
			device,
			score: calculateLineLength(device.location_history),
		}))
		.sort((a, b) => b.score - a.score)
		.slice(0, 10);

	return (
		<section>
			{isLoading && <p>Loading...</p>}
			{error && <p>{error}</p>}
			<ul>
				{top10DevicesByScore.map(({ device, score }) => {
					return (
						<CatLeaderboardCard key={device.id} device={device} score={score} />
					);
				})}
			</ul>
		</section>
	);
}
