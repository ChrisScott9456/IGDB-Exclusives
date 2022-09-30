import { Platform } from './Platform';

export interface Game {
	cover: string;
	id: number;
	name: string;
	parent_game: number;
	platforms: Platform[];
	rating: number;
}
