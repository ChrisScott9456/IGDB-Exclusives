import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import Header from '../components/header';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<Header />
			<Component {...pageProps} />{' '}
		</ThemeProvider>
	);
}

export default MyApp;
