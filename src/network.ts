import axios, { AxiosResponse } from 'axios';
import { User } from './Types/User';
import Device from './Types/Device';
import CatFromAxios from './Types/CatFromAxios';

const NEARBY_DISTANCE = 5;

const network = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_HOST,
	headers: {
		authorization: process.env.REACT_APP_LOGGED_IN_USER,
	},
});

export function getUser(): Promise<User> {
	return network
		.get('/api/users/settings')
		.then((res: AxiosResponse) => {
			return res.data.data;
		})
		.catch((err: Error) => {
			console.log(`Network error: ${err.message}`);
			return {};
		});
}

export function updateUser(data: User): Promise<User> {
	return network
		.patch('/api/users/settings', data)
		.then((res: AxiosResponse) => {
			return res.data.data;
		})
		.catch((err: Error) => {
			console.log(`Network error: ${err.message}`);
			return {};
		});
}

export function getDevicesForUser(userId: string): Promise<Device[]> {
	return network
		.get(`/api/users/${userId}/devices`)
		.then(({ data: { data: devices } }) => {
			return devices;
		})
		.catch((err) => {
			console.log(err);
			return [];
		});
}

export function getCatsForUser(userId: string): Promise<CatFromAxios[]> {
	return network
		.get(`/api/users/${userId}/cats`)
		.then(({ data: { data: cats } }) => {
			return cats;
		})
		.catch((err) => {
			console.log(err);
			return [];
		});
}

export function getCatsNear(catId: string): Promise<CatFromAxios> {
	return network
		.get(`/api/cats/nearby/${catId}/${NEARBY_DISTANCE}`)
		.then(({ data: { data: cats } }) => {
			return cats;
		});
}
