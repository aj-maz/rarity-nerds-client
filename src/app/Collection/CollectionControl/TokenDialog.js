/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import {
	makeStyles,
	Paper,
	Typography,
	IconButton,
	Divider,
	Chip,
	Dialog,
	DialogTitle,
	Table,
	TableBody,
	TableHead,
	TableRow,
	Grid,
	Avatar,
	TableCell
} from '@mui/material';

import TokenCard from './TokenCard';

const ipfsConvert = (tokenURL) => {
	let target =
		tokenURL && tokenURL.includes('ipfs')
			? tokenURL.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')
			: tokenURL;
	return target;
};

const TokenDialog = ({ open, handleClose, token, collection, total, traits }) => {
	const classes = {};

	if (!token) return null;

	const findTraitAmount = ({ trait_type, value }) =>
		traits
			? traits.find((tt) => tt.trait_type === trait_type && tt.value === value) &&
				traits.find((tt) => tt.trait_type === trait_type && tt.value === value).amount
			: 0;

	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="simple-dialog-title"
			open={open}
			//css={css`max-width: none ;`}
			maxWidth="lg"
		>
			<Grid container>
				<Grid md={4} Item>
					<TokenCard token={token} total={total} collection={collection} />
				</Grid>
				<Grid md={8} Item>
					<Table aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell align="center">Trait</TableCell>
								<TableCell align="center">Value</TableCell>
								<TableCell align="center">Amount</TableCell>
								<TableCell align="center">%</TableCell>
								<TableCell align="center">Score</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{token.attributes &&
								token.attributes
									.sort((a, b) => findTraitAmount(b) - findTraitAmount(a))
									.map((trait) => {
										return (
											<TableRow key={trait.trait_type}>
												<TableCell align="center">{trait.trait_type}</TableCell>
												<TableCell align="center">{trait.value}</TableCell>
												<TableCell align="center">{findTraitAmount(trait)}</TableCell>
												<TableCell align="center">
													{(findTraitAmount(trait) * 100 / total).toFixed(2)}
												</TableCell>
												<TableCell align="center">
													{(total / findTraitAmount(trait)).toFixed(2)}
												</TableCell>
											</TableRow>
										);
									})}
						</TableBody>
					</Table>
				</Grid>
			</Grid>
		</Dialog>
	);
};

export default TokenDialog;
