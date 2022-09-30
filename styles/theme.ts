import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const colors = {
	brand: {
		50: '#f3ecff',
		100: '#d6caea',
		200: '#b9a9d7',
		300: '#9d87c6',
		400: '#8164b4',
		500: '#674b9b',
		600: '#503a79',
		700: '#392a58',
		800: '#221837',
		900: '#0d0618',
	},
};

const theme = extendTheme({ colors }, withDefaultColorScheme({ colorScheme: 'purple' }));

export default theme;
