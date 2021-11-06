import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Router from './app/router';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const theme = createTheme({
	palette: {
		primary: { main: '#ffd166' },
		secondary: { main: '#ef476f' },
		background: {
			paper: '#ffffff',
			default: '#e5e5e5'
		}
	},
	typography: {
		fontFamily: "'Kanit', sans-serif"
	}
});

const darkTheme = createTheme({
	palette: {
		secondary: { main: '#2A344D' },
		primary: { main: '#54ABE3' },
		type: 'dark',
		background: {
			paper: '#f1faee',
			default: '#8d99ae'
		}
	},
	typography: {
		fontFamily: "'Kanit', sans-serif"
	}
});

const client = new ApolloClient({
	uri: process.env.REACT_APP_GRPAHQL_URL,
	cache: new InMemoryCache()
});

const App = () => {
	const dark = false;
	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={dark ? darkTheme : theme}>
				<CssBaseline />
				<Router />
			</ThemeProvider>
		</ApolloProvider>
	);
};

export default App;
