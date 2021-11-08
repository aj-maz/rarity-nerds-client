/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Paper, Grid, Typography, IconButton, Divider } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { useQuery, gql } from '@apollo/client';

import Loader from '../../common/Loader';
import TraitTypes from './TraitTypes';
import TraitTable from './TraitTable';
import FilterManager from './FiltersManager';
import Tokens from './Tokens';

const TRAITS = gql`
	query Traits($collectionId: ID!) {
		traits(collectionId: $collectionId) {
			collectionId
			trait_type
			value
			amount
		}
	}
`;

const CollectionControl = ({ collection, collectionId, tokensCount }) => {
	const [ filters, setFilters ] = useState([]);
	const [ selectedList, setSelectedList ] = useState([]);
	const [ filterIds, setFilterIds ] = useState([]);
	const [ sortBy, setSortBy ] = useState('normalized');

	const [ minimize, setMinimize ] = useState(false);

	const addFilter = (filter) => {
		setFilters([ ...filters, filter ]);
	};

	const removeFilter = (index) => {
		setFilters(filters.filter((item, i) => i !== index));
	};

	const { data, loading, error } = useQuery(TRAITS, {
		variables: {
			collectionId
		}
	});

	return (
		<div>
			{loading ? (
				<Loader size={16} />
			) : (
				<div>
					<Paper
						css={css`
							padding: 2em;
							margin: 2em;
						`}
					>
						<div
							css={css`
								display: flex;
								justify-content: space-between;
							`}
						>
							<Typography variant="h6">Traits</Typography>
							<IconButton onClick={() => setMinimize(!minimize)}>
								{minimize ? <ArrowDownward /> : <ArrowUpward />}
							</IconButton>
						</div>
						{!minimize && (
							<Grid container>
								<Grid md={3} css={css`border-right: 1px solid #f8f8f8;`}>
									<TraitTypes
										filters={filters}
										addFilter={addFilter}
										removeFilter={removeFilter}
										traits={data.traits}
										tokensCount={tokensCount}
										selectedList={selectedList}
										setSelectedList={setSelectedList}
									/>
								</Grid>
								<Grid md={9}>
									<TraitTable
										traitName={selectedList}
										addFilter={addFilter}
										removeFilter={removeFilter}
										filters={filters}
										traits={data.traits}
										tokensCount={tokensCount}
									/>
								</Grid>
							</Grid>
						)}
						<Divider
							css={css`
								margin-top: 1em;
								margin-bottom: 1em;
							`}
						/>
						<div>
							<FilterManager
								removeFilter={removeFilter}
								filters={filters}
								total={tokensCount}
								sortBy={sortBy}
								setSortBy={setSortBy}
								setFilterIds={setFilterIds}
							/>
						</div>
					</Paper>
					<div css={css`margin: 2em;`}>
						<Tokens
							filterIds={filterIds}
							traits={data.traits}
							total={tokensCount}
							collectionId={collectionId}
							collection={collection}
							sortBy={sortBy}
							filters={filters}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default CollectionControl;
