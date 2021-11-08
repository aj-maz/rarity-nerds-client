/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Paper, Typography, Avatar, AvatarGroup } from '@mui/material';

// Edit
// Shoe Details
// Fetching Options
// Publicity Options
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import DetailPanel from './DetailPanel';
import ActionControl from './ActionControl'
import Loader from '../../common/Loader'

const COLLECTION = gql`
	query Collection($_id: ID!) {
		collection(_id: $_id) {
			_id
			collectionName
			logo
			address
			cover
			description
			published
			markets
            createdAt
		}
	}
`;

const CollectionDetails = () => {
	const { _id } = useParams();
	console.log(_id);

	const { data, loading, error, refetch } = useQuery(COLLECTION, { variables: {_id} });

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

    const { collection } = data

	return (
		<div>
			<DetailPanel collection={collection} refetch={refetch} />
			<ActionControl collection={collection}  />
		</div>
	);
};

export default CollectionDetails;
