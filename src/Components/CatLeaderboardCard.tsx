import React from 'react';
import axios from 'axios';
import CatFromAxios from '../Interfaces/CatFromAxios';
import Device from '../Interfaces/Device';
import { useEffect, useState } from 'react';

export default function CatLeaderboardCard({
	device,
	score,
}: {
	device: Device;
	score: number;
}) {
	const [cat, setCat] = useState<CatFromAxios | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		setIsLoading(true);
		axios
			.get(`http://localhost:9090/api/users/${device.owner_id}/cats`)
			.then((response) => {
				setIsLoading(false);
				setCat(
					response.data.data.find(
						(cat: CatFromAxios) => cat.device_id === device.id
					)
				);
			})
			.catch((err: Error) => {
				setIsLoading(false);
				setError(`${err}`);
			});
	}, [device]);

	return (
		<li>
			{isLoading && <p>Loading...</p>}
			{error && <p>{error}</p>}
			<h3>{cat?.name}</h3>
			<p>Score: {score}</p>
			<p>{cat?.description || ''}</p>
			<img src={cat?.picture_url || ''} alt={cat?.name} />
		</li>
	);
}
