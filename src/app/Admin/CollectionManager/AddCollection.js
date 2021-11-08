/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Divider, Paper, Typography, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const CREATE_COLLECTION = gql`
	mutation CreateCollectionMutation(
		$collectionName: String!
		$address: String!
		$cover: String!
		$logo: String!
		$description: String!
	) {
		createCollection(
			collectionName: $collectionName
			address: $address
			logo: $logo
			description: $description
			cover: $cover
		) {
			_id
		}
	}
`;

const AddCollection = () => {
	const [ formInput, setForm ] = useState({
		collectionName: '',
		address: '',
		logo: '',
		cover: '',
		description: ''
	});
	const [ createCollection ] = useMutation(CREATE_COLLECTION);
	const navigate = useNavigate();

	const setInput = (field, value) => {
		const obj = { ...formInput };
		obj[field] = value;
		setForm(obj);
	};

	return (
		<div css={css`padding: 2em;`}>
			<Paper>
				<Typography css={css`padding: 1em;`} variant="h5">
					Let's create a collection
				</Typography>
				<Divider />
				<Grid container css={css`padding: 0.5em;`}>
					<Grid css={css`padding: 0.5em;`} item md={6}>
						<TextField
							value={formInput.collectionName}
							onChange={(e) => setInput('collectionName', e.target.value)}
							color="secondary"
							variant="filled"
							label="Collection Name"
							fullWidth
						/>
					</Grid>
					<Grid css={css`padding: 0.5em;`} item md={6}>
						<TextField
							value={formInput.address}
							onChange={(e) => setInput('address', e.target.value)}
							color="secondary"
							variant="filled"
							label="Contract Address"
							fullWidth
						/>
					</Grid>
					<Grid css={css`padding: 0.5em;`} item md={6}>
						<TextField
							value={formInput.cover}
							onChange={(e) => setInput('cover', e.target.value)}
							color="secondary"
							variant="filled"
							label="Cover"
							fullWidth
						/>
					</Grid>
					<Grid css={css`padding: 0.5em;`} item md={6}>
						<TextField
							value={formInput.logo}
							onChange={(e) => setInput('logo', e.target.value)}
							color="secondary"
							variant="filled"
							label="Logo"
							fullWidth
						/>
					</Grid>
					<Grid css={css`padding: 0.5em;`} item md={12}>
						<TextField
							value={formInput.description}
							onChange={(e) => setInput('description', e.target.value)}
							color="secondary"
							variant="filled"
							label="Description"
							fullWidth
							multiline
						/>
					</Grid>
				</Grid>
				<Divider />
				<div
					css={css`
						padding: 1em;
						display: flex;
						justify-content: space-between;
					`}
				>
					<Button onClick={() => navigate('/admin')} variant="text" color="secondary">
						Cancel
					</Button>

					<Button
						disabled={
							!formInput.address ||
							!formInput.collectionName ||
							!formInput.cover ||
							!formInput.logo ||
							!formInput.description
						}
						onClick={() =>
							createCollection({ variables: formInput })
								.then(({ data }) => {
									console.log(data)
									navigate(`/admin/collection/${data.createCollection._id}`);
								})
								.catch((err) => console.log(err))}
						variant="contained"
						color="primary"
					>
						Create
					</Button>
				</div>
			</Paper>
		</div>
	);
};

export default AddCollection;
