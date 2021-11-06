/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Grid } from '@mui/material';
import CollectionCard from './CollectionCard';
import { useQuery, gql } from '@apollo/client';
import Loader from '../common/Loader';

const COLLECTIONS = gql`
	query AdminCollections {
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
		}
	}
`;

const HomePage = () => {
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
		<div css={css`margin: 2em;`}>
			<Grid container spacing={2}>
				{data.adminCollections.map((collection) => (
					<Grid item xl={3} lg={4} md={6} key={collection._id}>
						<CollectionCard collection={collection} />
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default HomePage;
