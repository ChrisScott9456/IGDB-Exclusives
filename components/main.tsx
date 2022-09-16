import { Select } from '@chakra-ui/react';
import { NextPage } from 'next/types';
import { Platform } from '../src/interfaces/Platform';

export interface MainProps {
	platforms: Platform[];
}

const Main: NextPage<MainProps> = ({ platforms }) => {
	return (
		<div>
			<Select placeholder="Select option">
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
