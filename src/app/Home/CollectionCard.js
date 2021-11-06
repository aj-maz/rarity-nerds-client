/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Paper, Typography, Avatar, AvatarGroup } from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom'

const CollectionCard = ({ collection }) => {

	const navigate = useNavigate()

	return (
		<Paper
			css={css`
				cursor: pointer;
				position: relative;
				margin-bottom: 1em;
			`}
			onClick={() => {
				navigate(`collection/${collection._id}`)
			}}
		>
			<div
				css={css`
					width: 100%;
					height: 200px;
				`}
			>
				<img
					src={collection.cover}
					css={css`
						width: 100%;
						height: 100%;
						object-fit: cover;
					`}
					alt={collection.collectionName}
				/>
			</div>
			<Avatar
				css={(theme) => css`
					width: 120px;
					height: 120px;
					position: absolute;
					top: 140px;
					right: 1em;
					border: 4px solid ${theme.palette.background.paper};
				`}
				src={collection.logo}
			/>
			<div css={css`padding: 2em;`}>
				<div css={css`align-items: center;`}>
					<Typography variant="h6">{collection.collectionName}</Typography>
					<Typography variant="subtitle2">
						Added At: {moment(collection.createdAt).format('YYYY/DD/MM HH:mm')}
					</Typography>
				</div>

				<Typography variant="body1">{collection.description}</Typography>
				<div css={css`dipslay: flex;`}>
					<Typography css={css`dipslay: inline-block;`} variant="subtitle1">
						Total Volume:{' '}
						<span css={(theme) => css`color: ${theme.palette.secondary.main};`}>
							{' '}
							{collection.totalVolume} BNB{' '}
						</span>
					</Typography>

					<AvatarGroup
						css={css`
							text-align: left;
							position: absolute;
							bottom: -1em;
							right: 1em;
						`}
					>
						{collection.markets?.includes('pancake') && (
							<Avatar src="https://fabboard.vercel.app/assets/pancakeswap_fav.ico" />
						)}
						{collection.markets?.includes('nftkey') && (
							<Avatar src="https://fabboard.vercel.app/assets/nftkey.svg" />
						)}
					</AvatarGroup>
				</div>
			</div>
		</Paper>
	);
};

export default CollectionCard;
