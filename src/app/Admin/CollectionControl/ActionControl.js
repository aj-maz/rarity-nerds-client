/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { Paper, Grid, TextField, Button, Divider, Typography } from '@mui/material';
import { gql, useQuery, useMutation } from '@apollo/client';
import Loader from '../../common/Loader';

const FETCH = gql`
	mutation FetchTokens($collectionId: ID!, $minId: Int!, $maxId: Int!, $offset: Int!, $generalTokenUri: String!) {
		fetchTokens(
			collectionId: $collectionId
			minId: $minId
			maxId: $maxId
			offset: $offset
			generalTokenUri: $generalTokenUri
		)
	}
`;

const STOP_FETCHING = gql`
	mutation StopFetching($_id: ID!) {
		stopFetching(_id: $_id)
	}
`;

const CALCULATE_RIRTY = gql`
	mutation CalculateRarity($_id: ID!) {
		calculateRarity(_id: $_id)
	}
`;

const FETCHING_STATUS = gql`
	query FetchingStatus($_id: ID!) {
		fetchingStatus(_id: $_id) {
			minId
			maxId
			offset
			generalTokenUri
			fetchedTokens
		}
	}
`;

const ActionControl = ({ collection }) => {
	const { data, loading, error, refetch } = useQuery(FETCHING_STATUS, {
		variables: {
			_id: collection._id
		}
	});

	console.log(data, loading, error);

	const [ formInput, setForm ] = useState({
		minId: '',
		maxId: '',
		generalTokenUri: '',
		offset: '',
		description: ''
	});

	const setInput = (field, value) => {
		const obj = { ...formInput };
		obj[field] = value;
		setForm(obj);
	};

	const [ fetchIt ] = useMutation(FETCH);
	const [ stopFetching ] = useMutation(STOP_FETCHING);
	const [ calculateRarity ] = useMutation(CALCULATE_RIRTY);

	const renderContent = () => {
		const isFetching = !!(data && data.fetchingStatus && data.fetchingStatus.maxId);

		const fetchingsStatus = data.fetchingStatus;

		return (
			<div>
				{isFetching ? (
					<Typography
						variant="body1"
						css={css`
							padding: 1em;
							text-align: center;
						`}
					>
						You are fetching tokens from id {fetchingsStatus.minId} till {fetchingsStatus.maxId}. There are{' '}
						{fetchingsStatus.fetchedTokens} tokens in the DB right now.
					</Typography>
				) : (
					<div css={css`text-align: center;`}>
						<Typography
							variant="body1"
							css={css`
								padding: 1em;
								text-align: center;
							`}
						>
							There are{' '}
							<span css={(theme) => css`color: ${theme.palette.secondary.main};`}>
								{' '}
								{fetchingsStatus.fetchedTokens}{' '}
							</span>{' '}
							Tokens in the DB
						</Typography>
						<Divider />
						<Grid container css={css`padding: 0.5em;`}>
							<Grid css={css`padding: 0.5em;`} item md={6}>
								<TextField
									value={formInput.minId}
									onChange={(e) => setInput('minId', e.target.value)}
									color="secondary"
									variant="filled"
									label="Min ID"
									fullWidth
								/>
							</Grid>
							<Grid css={css`padding: 0.5em;`} item md={6}>
								<TextField
									value={formInput.maxId}
									onChange={(e) => setInput('maxId', e.target.value)}
									color="secondary"
									variant="filled"
									label="Max ID"
									fullWidth
								/>
							</Grid>
							<Grid css={css`padding: 0.5em;`} item md={6}>
								<TextField
									value={formInput.offset}
									onChange={(e) => setInput('offset', e.target.value)}
									color="secondary"
									variant="filled"
									label="Offset"
									fullWidth
								/>
							</Grid>
							<Grid css={css`padding: 0.5em;`} item md={6}>
								<TextField
									value={formInput.generalTokenUri}
									onChange={(e) => setInput('generalTokenUri', e.target.value)}
									color="secondary"
									variant="filled"
									label="General Token URI"
									fullWidth
								/>
							</Grid>
						</Grid>
					</div>
				)}

				<Divider />
				<div
					css={css`
						padding: 1em;
						display: flex;
						justify-content: space-between;
					`}
				>
					<Button
						onClick={() => {
							calculateRarity({
								variables: {
									_id: collection._id
								}
							})
								.then(() => {
									console.log('Calculating Rarity');
								})
								.catch((err) => {
									console.log('Some Error happened');
								});
						}}
						disabled={isFetching}
						color="primary"
						variant="contained"
					>
						Calculate Rarity
					</Button>

					{isFetching ? (
						<Button
							onClick={() => {
								stopFetching({
									variables: {
										_id: collection._id
									}
								})
									.then(() => refetch())
									.catch((err) => {
										console.log(err);
									});
							}}
							color="secondary"
							variant="outlined"
						>
							Stop Fetching
						</Button>
					) : (
						<Button
							disabled={
								!formInput.minId || !formInput.maxId || !formInput.offset || !formInput.generalTokenUri
							}
							color="secondary"
							variant="contained"
							onClick={() => {
								console.log({
									minId: Number(formInput.minId),
									maxId: Number(formInput.maxId),
									offset: Number(formInput.offset),
									generalTokenUri: formInput.generalTokenUri
								});
								fetchIt({
									variables: {
										minId: Number(formInput.minId),
										maxId: Number(formInput.maxId),
										offset: Number(formInput.offset),
										generalTokenUri: formInput.generalTokenUri,
										collectionId: collection._id
									}
								})
									.then(() => refetch())
									.catch((err) => console.log(err));
							}}
						>
							Start Fetching
						</Button>
					)}
				</div>
			</div>
		);
	};

	return (
		<Paper css={css`margin: 2em;`}>
			{!data ? (
				<div css={css`padding: 2em;`}>
					<Loader size={16} />{' '}
				</div>
			) : (
				renderContent()
			)}
		</Paper>
	);
};

export default ActionControl;
