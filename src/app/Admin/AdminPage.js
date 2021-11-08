/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Divider, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Loader from '../common/Loader';

const COLLECTIONS = gql`
	query adminCollections {
		adminCollections {
			_id
			logo
			collectionName
			cover
			address
			description
			chain
			published
			markets
			createdAt
		}
	}
`;

// Go for creating collections
// Table of collections

const AdminPage = () => {
	const navigate = useNavigate();

	const { data, loading, error } = useQuery(COLLECTIONS);

	if (loading) {
		return (
			<div
				css={css`
					width: 100%;
					height: calc(100vh - 60px);
				`}
			>
				<Loader />
			</div>
		);
	}
	return (
		<div css={css`padding: 2em;`}>
			<Button
				onClick={() => {
					navigate('add-collection');
				}}
				variant="outlined"
				color="secondary"
			>
				Add Collection
			</Button>
			<Divider css={css`margin-top: 0.5em;`} />
			<Table component={Paper} css={css`margin-top: 1em`}>
				<TableHead>
					<TableRow>
						<TableCell align="center">Collection Name</TableCell>
						<TableCell align="center">Status</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.adminCollections.map((collection) => (
						<TableRow css={css`cursor: pointer`} onClick={() => navigate(`/admin/collection/${collection._id}`)} key={collection._id}>
							<TableCell align="center">{collection.collectionName}</TableCell>
							<TableCell align="center">{collection.published ? 'Published' : 'Not Published'}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default AdminPage;
