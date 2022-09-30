import axios, { AxiosRequestConfig } from 'axios';
import to from 'await-to-js';
import { Platform } from '../interfaces/Platform';
import { MultiQuery } from '../interfaces/MultiQuery';
import { Game } from '../interfaces/Game';
import { Cover } from '../interfaces/Cover';

// const fs = require('fs');
const keyfile = require('../keyfile.json');

/**
 * * Adds the authentication headers to all IGDB API requests
 */
axios.interceptors.request.use(async (config) => {
	if (!config?.url?.includes('https://id.twitch.tv/oauth2/token')) {
		const headers = await authenticate();
		config.headers = { ...config.headers, ...headers };
	}

	return config;
});

/**
 * * Gets the oauth2 token from Twitch to authenticate all IGDB API requests
 */
async function authenticate() {
	const [e, r] = await to(axios.post(`https://id.twitch.tv/oauth2/token?client_id=${keyfile.client_id}&client_secret=${keyfile.client_secret}&grant_type=client_credentials`));

	if (e) {
		throw e;
	} else if (r) {
		keyfile.token = r.data.access_token;

		// await fs.writeFileSync('keyfile.json', `{ "client_id": "${keyfile.client_id}", "client_secret": "${keyfile.client_secret}", "token": "${r.data.access_token}" }`, (err: Error) => {
		// 	if (err) {
		// 		console.error(err);
		// 	}
		// });
	}

	return {
		'Client-ID': keyfile.client_id,
		Authorization: `Bearer ${keyfile.token}`,
	};
}

/**
 * * Gets the full list of platforms and their ids available on IGDB
 */
export async function getPlatforms(): Promise<Platform[]> {
	const [e, r] = await to(
		axios.post<Platform[]>(
			'https://api.igdb.com/v4/platforms',
			`fields abbreviation,alternative_name,name;
            limit 500;`
		)
	);

	if (e) {
		throw e;
	}

	return r.data.sort((a, b) => {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}
		return 0;
	});
}

export async function getExclusives(id: number): Promise<Game[]> {
	const [e, r] = await to(
		axios.post<MultiQuery<Game[]>[]>(
			'https://api.igdb.com/v4/multiquery',
			`query games "Platform" {
                fields name,rating,platforms.name,parent_game,cover;
                sort rating desc;
                where platforms !=n & platforms = {${id}} & rating >= 50;
                limit 500;
                };`
		)
	);

	console.log('MULTIQUERY');

	if (e) {
		throw e;
	}

	const output = r.data[0].result;
	const coverURLs = await getCovers(output.map((el) => el.cover));

	output.forEach((el) => {
		el.cover = coverURLs.find((innerEl) => `${el.cover}` == `${innerEl.id}`)?.image_id || '';
	});

	return output;
}

export async function getCovers(coverIds: string[]): Promise<Cover[]> {
	const [e, r] = await to(
		axios.post<Cover[]>(
			'https://api.igdb.com/v4/covers',
			`fields image_id;
            where id = (${coverIds.join(',')});
            limit 500;`
		)
	);

	if (e) {
		throw e;
	}

	return r.data;
}
