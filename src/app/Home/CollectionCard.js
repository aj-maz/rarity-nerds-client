/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Paper, Typography, Avatar, AvatarGroup } from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const CollectionCard = ({ collection }) => {
	const navigate = useNavigate();

	return (
		<Paper
			css={css`
				cursor: pointer;
				position: relative;
				margin-bottom: 1em;
			`}
			onClick={() => {
				navigate(`collection/${collection._id}`);
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
					<Typography css={(theme) => css`color: ${theme.palette.primary.dark};`} variant="h6">
						{collection.collectionName}
					</Typography>
					<Typography variant="subtitle2">
						Added At:{' '}
						<span css={(theme) => css`color: ${theme.palette.secondary.main};`}>
							{moment(Number(collection.createdAt)).format('YYYY/DD/MM HH:mm')}
						</span>
					</Typography>
				</div>

				<div
					css={css`
						height: 100px;
						overflow: hidden;
					`}
				>
					<Typography css={css`height: 100%; overflow: auto; '`} variant="body1">
						{collection.description}
					</Typography>
				</div>
			</div>
		</Paper>
	);
};

export default CollectionCard;
