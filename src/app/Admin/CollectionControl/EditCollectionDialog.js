/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import {
	Button,
	Divider,
	Paper,
	Typography,
	Grid,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@mui/material';
import { gql, useMutation } from '@apollo/client';

const EDIT_COLLECTION = gql`
	mutation EditCollection(
		$id: ID!
		$collectionName: String!
		$address: String!
		$logo: String!
		$cover: String!
		$description: String!
	) {
		editCollection(
			_id: $id
			collectionName: $collectionName
			address: $address
			logo: $logo
			cover: $cover
			description: $description
		)
	}
`;

const EditCollectionDialog = ({ open, setOpen, collection, refetch }) => {
	const [ formInput, setForm ] = useState(collection);

	const [ editCollection ] = useMutation(EDIT_COLLECTION);

	const setInput = (field, value) => {
		const obj = { ...formInput };
		obj[field] = value;
		setForm(obj);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Edit Collection</DialogTitle>
				<DialogContent>
					<Grid container>
						<Grid
							css={css`
								padding-right: 0.25em;
								padding-bottom: 0.5em;
							`}
							item
							md={6}
						>
							<TextField
								value={formInput.collectionName}
								onChange={(e) => setInput('collectionName', e.target.value)}
								color="secondary"
								variant="filled"
								label="Collection Name"
								fullWidth
							/>
						</Grid>
						<Grid
							css={css`
								padding-left: 0.25em;
								padding-bottom: 0.5em;
							`}
							item
							md={6}
						>
							<TextField
								value={formInput.address}
								onChange={(e) => setInput('address', e.target.value)}
								color="secondary"
								variant="filled"
								label="Contract Address"
								fullWidth
							/>
						</Grid>
						<Grid css={css`padding-right: 0.25em;`} item md={6}>
							<TextField
								value={formInput.cover}
								onChange={(e) => setInput('cover', e.target.value)}
								color="secondary"
								variant="filled"
								label="Cover"
								fullWidth
							/>
						</Grid>
						<Grid css={css`padding-left: 0.25em;`} item md={6}>
							<TextField
								value={formInput.logo}
								onChange={(e) => setInput('logo', e.target.value)}
								color="secondary"
								variant="filled"
								label="Logo"
								fullWidth
							/>
						</Grid>
						<Grid css={css`padding-top: 0.5em;`} item md={12}>
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
				</DialogContent>
				<DialogActions css={css`padding-bottom: 1em;`}>
					<Button color="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button
						onClick={() => {
							editCollection({
								variables: {
									id: collection._id,
									...formInput
								}
							})
								.then(() => {
									refetch();
									handleClose();
								})
								.catch((err) => console.log(err));
						}}
						css={css`margin-right: 1em;`}
						variant="contained"
						color="primary"
					>
						Edit
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default EditCollectionDialog;
