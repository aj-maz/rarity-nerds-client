/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useQuery, gql } from '@apollo/client';
import { Paper, Grid, Typography, IconButton, Divider, Stack, Pagination } from '@mui/material';
import { GridOn, Toc } from '@mui/icons-material';
import { Fragment, useState, useEffect } from 'react';

import TokenTable from './TokenTable';
import TokenGrid from './TokenGrid';
import Loader from '../../common/Loader';
import TokenDialog from './TokenDialog';

const TOKENS = gql`
	query Tokens($collectionId: ID!, $sortBy: String, $filters: [String], $offset: Int, $filterIds: [String]) {
		tokens(
			collectionId: $collectionId
			sortBy: $sortBy
			filters: $filters
			offset: $offset
			filterIds: $filterIds
		) {
			total
			items
		}
	}
`;

const Tokens = ({ collection, total, collectionId, filters, sortBy, traits, filterIds = [ 1, 2, 3 ] }) => {
	const [ viewType, setViewType ] = useState('grid');
	const [ offset, setOffset ] = useState(0);
	const [ tokenDialog, setTokenDialog ] = useState(null);

	const { data, loading, error } = useQuery(TOKENS, {
		variables: {
			collectionId,
			filters: filters.map((fil) => JSON.stringify(fil)),
			sortBy,
			offset,
			filterIds: filterIds.map((id) => String(id))
		},
		pollInterval: 4000,
	});

	useEffect(
		() => {
			setOffset(0);
		},
		[ filters, filterIds, sortBy ]
	);

	return (
		<div>
			<div css={css`margin-bottom: 1em;`}>
				<IconButton onClick={() => setViewType('grid')} color={viewType === 'grid' ? 'secondary' : 'default'}>
					<GridOn />
				</IconButton>
				<IconButton
					onClick={() => setViewType('row')}
					color={viewType === 'row' ? 'secondary' : 'default'}
					className={css`margin-left: 1em;`}
				>
					<Toc />
				</IconButton>
			</div>
			<div>
				{loading ? (
					<Loader size={16} />
				) : (
					<Fragment>
						{viewType === 'grid' ? (
							<div>
								<TokenGrid
									setTokenDialog={setTokenDialog}
									tokens={data.tokens}
									collection={collection}
									total={total}
								/>
							</div>
						) : (
							<div>
								<TokenTable
									setTokenDialog={setTokenDialog}
									tokens={data.tokens}
									collection={collection}
									total={total}
								/>
							</div>
						)}
						<TokenDialog
							open={!!tokenDialog}
							handleClose={() => setTokenDialog(null)}
							token={tokenDialog}
							total={total}
							collection={collection}
							traits={traits}
						/>
						<div
							css={css`
								margin-top: 2em;
								display: flex;
								align-items: center;
								justify-content: center;
							`}
						>
							<Pagination
								count={parseInt(Number(data.tokens.total) / 20) + 1}
								page={parseInt(offset / 20) + 1}
								onChange={(e, page) => {
									setOffset((page - 1) * 20);
								}}
							/>
						</div>
					</Fragment>
				)}
			</div>
		</div>
	);
};

export default Tokens;
