import type { NextApiRequest, NextApiResponse } from 'next';
import { getExclusives } from '../../../igdb';
import { Platform } from '../../../interfaces/Platform';

export default async function platformHandler(req: NextApiRequest, res: NextApiResponse<Platform[] | Error>) {
	try {
		const {
			query: { id },
			method,
		} = req;

		const results = await getExclusives(id as any);
		res.status(200).send(results);
	} catch (err) {
		res.status(500).send(new Error('Error retrieving exclusives from IGDB'));
	}
}
