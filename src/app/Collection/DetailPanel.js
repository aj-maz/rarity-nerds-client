/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Paper, Typography, Avatar, AvatarGroup, IconButton } from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Publish, Unpublished, Edit } from '@mui/icons-material';
import { gql, useMutation } from '@apollo/client';

const CHANGE_PUBLICITY = gql`
	mutation ChangePublicity($_id: ID!) {
		changePublicity(_id: $_id)
	}
`;

const CollectionCard = ({ collection, refetch }) => {
	const navigate = useNavigate();


	return (
		<Paper
			css={css`
				position: relative;
				margin-bottom: 1em;
			`}
		>
		<div
				css={css`
					width: 100%;
					height: 300px;
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
					top: 200px;
					right: calc(50% - 60px);
					border: 4px solid ${theme.palette.background.paper};
				`}
				src={collection.logo}
			/>
			<div css={css`padding: 2em;`}>
				<div css={css`align-items: center;`}>
					<Typography
						css={(theme) =>
							css`
								color: ${theme.palette.primary.dark};
								text-align: center;
							`}
						variant="h6"
					>
						{collection.collectionName}
					</Typography>
					<Typography css={css`text-align: center;`} variant="subtitle2">
						Added At:{' '}
						<span css={(theme) => css`color: ${theme.palette.secondary.main};`}>
							{moment(Number(collection.createdAt)).format('YYYY/DD/MM HH:mm')}
						</span>
					</Typography>
				</div>

				<Typography css={css`text-align: center; '`} variant="body1">
					{collection.description}
				</Typography>
				<div css={css`dipslay: flex;`}>
					<Typography
						css={css`
							dipslay: inline-block;
							text-align: center;
						`}
						variant="subtitle1"
					>
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
						{collection.markets.includes('pancake') && (
							<Avatar src="https://fabboard.vercel.app/assets/pancakeswap_fav.ico" />
						)}
						{collection.markets.includes('nftkey') && (
							<Avatar src="https://fabboard.vercel.app/assets/nftkey.svg" />
						)}
					</AvatarGroup>
				</div>
			</div>
		</Paper>
	);
};

export default CollectionCard;
