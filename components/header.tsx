import { Select } from '@chakra-ui/react';
import to from 'await-to-js';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import { useState } from 'react';
import { getExclusives } from '../igdb';
import { Platform } from '../interfaces/Platform';

const Header: NextPage = () => {
	return <header>DO THE THING</header>;
};

export default Header;
