import { Button, Select } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import { useState } from 'react';
import { getExclusives } from '../igdb';
import { Platform } from '../interfaces/Platform';

export interface MainProps {
	platforms: Platform[];
}

const Main: NextPage<MainProps> = ({ platforms }) => {
	const router = useRouter();

	const handleChange = (e: any) => {
		router.push(`/platform/${e.target.value}`);
	};

	return (
		<div>
			<Select placeholder="Select Platform" onChange={handleChange}>
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
