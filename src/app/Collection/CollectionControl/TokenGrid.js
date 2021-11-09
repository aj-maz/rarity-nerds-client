/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
	TableContainer,
	TableHead,
	TableCell,
	TableRow,
	TableBody,
	Paper,
	Table,
	Chip,
	Avatar,
	IconButton,
	Grid
} from '@mui/material';
import { Equalizer } from '@mui/icons-material';
import { Fragment } from 'react';

import TokenCard from './TokenCard';

const ipfsConvert = (tokenURL) => {
	let target =
		tokenURL && tokenURL.includes('ipfs')
			? tokenURL.replace('ipfs://', 'https://ipfs.2read.net/ipfs/')
			: tokenURL;
	return target;
};

const TokenTable = ({ tokens, total, collection, setTokenDialog }) => {
	const classes = {};

	console.log(tokens);

	return (
		<Grid container>
			{tokens.items.map((item) => JSON.parse(item)).map((token) => (
				<Grid item lg={3} md={4} css={css`margin-bottom: 1em; padding: 0.25em`}>
					<Paper>
						<TokenCard
							setTokenDialog={setTokenDialog}
							token={token}
							collection={collection}
							total={total}
						/>
					</Paper>
				</Grid>
			))}
		</Grid>
	);
};

export default TokenTable;
