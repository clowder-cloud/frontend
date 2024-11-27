export default interface Cat {
	name: string;
	image: string | null;
	history: { lat: number; lon: number }[];
}
