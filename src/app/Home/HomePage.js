/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Grid } from '@mui/material';
import CollectionCard from './CollectionCard';

const collection = {
	title: 'Fxck Face',
	addedAt: new Date(),
	totalVolume: 28398.23,
	description: `Fxck Face is a collection of 5,555 
    unique NFTs existing on the ethereum blockchain. 
    Each has a stylistic combination of different traits including Head, Body, and Level. 
    The background color indicates the level with rarity distributions as follows:`,
	logo:
		'https://fabboard-api.vercel.app/api/images/https%3A%2F%2Fstatic-nft.pancakeswap.com%2Fmainnet%2F0x0a8901b0E25DEb55A87524f0cC164E9644020EBA%2Favatar.png',
	cover:
		'https://fabboard-api.vercel.app/api/images/https%3A%2F%2Fstatic-nft.pancakeswap.com%2Fmainnet%2F0x0a8901b0E25DEb55A87524f0cC164E9644020EBA%2Fbanner-lg.png',
	markets: [ 'pancake', 'nftkey' ]
};

const HomePage = () => {
	return (
		<div css={css`margin: 2em;`}>
			<Grid container spacing={2}>
				<Grid item md={6}>
					<CollectionCard collection={collection} />
				</Grid>
				<Grid item md={6}>
					<CollectionCard collection={collection} />
				</Grid>
			</Grid>
		</div>
	);
};

export default HomePage;
