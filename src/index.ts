import axios, { AxiosRequestConfig } from 'axios';
import to from 'await-to-js';

const fs = require('fs');
const keyfile = require('../keyfile.json');

async function authenticate() {
	const [e, r] = await to(axios.post(`https://id.twitch.tv/oauth2/token?client_id=${keyfile.client_id}&client_secret=${keyfile.client_secret}&grant_type=client_credentials`));

	if (e) {
		throw e;
	} else if (r) {
		keyfile.token = r.data.access_token;

		await fs.writeFileSync('keyfile.json', `{ "client_id": "${keyfile.client_id}", "client_secret": "${keyfile.client_secret}", "token": "${r.data.access_token}" }`, (err: Error) => {
			if (err) {
				console.error(err);
			}
		});
	}

	return {
		'Client-ID': keyfile.client_id,
		Authorization: `Bearer ${keyfile.token}`,
	};
}

(async () => {
	try {
		const config: AxiosRequestConfig = {
			headers: await authenticate(),
		};

		const [e, r] = await to(
			axios.post(
				'https://api.igdb.com/v4/multiquery',
				`query games "Nintendo Switch" {
                fields name,rating,platforms.name,parent_game;
                sort rating desc; 
                where platforms !=n & platforms = {130} & rating >= 50;
                limit 500;
                };`,
				config
			)
		);

		if (e) {
			throw e;
		}

		console.log(r);
		console.log();
	} catch (e) {
		console.error(e);
		console.log();
	}
})();
