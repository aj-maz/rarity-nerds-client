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
	IconButton
} from '@mui/material';
import { Equalizer } from '@mui/icons-material';
import { Fragment } from 'react';

import TokenDialog from './TokenDialog';

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
		<TableContainer className={classes.tableContainer} component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="center">ID</TableCell>
						<TableCell align="center"> Rank</TableCell>
						<TableCell align="center">Score</TableCell>
						<TableCell align="center">Pancake</TableCell>
						<TableCell align="center">Image</TableCell>
						<TableCell align="center">Details</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{tokens.items.map((item) => JSON.parse(item)).map((token) => (
						<Fragment>
							<TableRow key={token.tokenId}>
								<TableCell align="center" component="th" scope="row">
									{token.tokenId}
								</TableCell>
								<TableCell align="center">
									{token.scoreRank}/{total}
								</TableCell>
								<TableCell align="center">
									{Number(token.normalizeScore) ? Number(token.normalizeScore).toFixed(2) : 0}
								</TableCell>

								<TableCell align="center">
									<div
										style={{ cursor: 'pointer' }}
										onClick={() =>
											window.open(
												`https://pancakeswap.finance/nfts/collections/${collection.address}/${token.tokenId}`,
												'_blank'
											)}
										css={css`text-align: center;`}
									>
										<Avatar
											css={css`display: inline-block;`}
											src="https://fabboard.vercel.app/assets/pancakeswap_fav.ico"
										/>
									</div>
								</TableCell>

								<TableCell align="center">
									<img
										style={{ width: 100 }}
										className={classes.tokenImage}
										src={ipfsConvert(token.image ? token.image : token.image_url)}
									/>
								</TableCell>
								<TableCell align="center">
									<IconButton onClick={() => setTokenDialog(token)} color="primary">
										<Equalizer />
									</IconButton>
								</TableCell>
							</TableRow>
						</Fragment>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TokenTable;
