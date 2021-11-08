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
import { Equalizer } from '@mui/icons-material';

const ipfsConvert = (tokenURL) => {
	let target =
		tokenURL && tokenURL.includes('ipfs')
			? tokenURL.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')
			: tokenURL;
	return target;
};

const TokenCard = ({ token, collection, total, setTokenDialog }) => {
	const classes = {};

	return (
		<div
			css={css`
				position: relative;
				padding: 1em;
			`}
		>
			<div
				css={css`
					display: flex;
					justify-content: space-between;
					position: relative;
				`}
			>
				<div
					css={css`
						padding: 1em;
						textAlign: center;
						text-align: center;
					`}
				>
					<Typography css={css``} variant="body1">
						Rarity Rank
					</Typography>
					<Typography css={(theme) => css`color: ${theme.palette.secondary.main};`} variant="body2">
						{token.scoreRank}/{total}
					</Typography>
				</div>
				<div
					css={css`
						padding: 1em;
						textAlign: center;
						text-align: center;
					`}
				>
					<Typography className={classes.rarityTitle} variant="body1">
						Rarity Score
					</Typography>
					<Typography css={(theme) => css`color: ${theme.palette.secondary.main};`} variant="body2">
						{token.normalizeScore && Number(token.normalizeScore).toFixed(2)}
					</Typography>
				</div>
			</div>
			<div className={classes.imageInfo}>
				<img
					css={css`
						border-radius: 8px 8px 0 0;
						width: 100%;
					`}
					src={ipfsConvert(token.image ? token.image : token.image_url)}
				/>
				<Typography
					css={(theme) =>
						css`
							background: ${theme.palette.primary.main};
							padding: 0.5em;
							border-radius: 0 0 8px 8px;
							text-align: center;
							margin-top: -0.5em;
							font-size: 1em;
						`}
					variant="h6"
				>
					{collection.collectionName} #{token.tokenId}
				</Typography>
			</div>
			<div>
				<div
					style={{ cursor: 'pointer' }}
					onClick={() =>
						window.open(
							`https://pancakeswap.finance/nfts/collections/${collection.address}/${token.tokenId}`,
							'_blank'
						)}
					css={css`
						text-align: center;
						position: absolute;
						bottom: 2em;
						right: 2em;
					`}
				>
					<Avatar
						css={css`display: inline-block;`}
						src="https://fabboard.vercel.app/assets/pancakeswap_fav.ico"
					/>
				</div>
				{setTokenDialog && (
					<div
						css={css`
							text-align: center;
							position: absolute;
							bottom: 2em;
							left: 2em;
						`}
					>
						<IconButton
							css={(theme) =>
								css`
									background: ${theme.palette.secondary.main} !important;
									color: white !important;
								`}
							onClick={() => setTokenDialog(token)}
							color="default"
						>
							<Equalizer />
						</IconButton>
					</div>
				)}
			</div>
		</div>
	);
};

export default TokenCard;
