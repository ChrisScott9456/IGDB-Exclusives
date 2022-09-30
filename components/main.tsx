import { Select } from '@chakra-ui/react';
import to from 'await-to-js';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import { useState } from 'react';
import { getExclusives } from '../igdb';
import { Platform } from '../interfaces/Platform';
export interface MainProps {
	platformId?: string;
	platforms: Platform[];
}

const Main: NextPage<MainProps> = ({ platformId, platforms }) => {
	const router = useRouter();

	const handleChange = async (e: any) => {
		router.push(`/platform/${e.target.value}`);
	};

	return (
		<div>
			<Select placeholder="Select Platform" onChange={handleChange} defaultValue={platformId}>
				{platforms.map((platform) => (
					<option value={platform.id} key={platform.id}>
						{platform.name}
					</option>
				))}
			</Select>
		</div>
	);
};

export default Main;
