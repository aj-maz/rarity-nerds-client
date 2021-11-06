/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Divider, Paper, Typography, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddCollection = () => {
	const navigate = useNavigate();
	return (
		<div css={css`padding: 2em;`}>
			<Paper>
				<Typography css={css`padding: 1em;`} variant="h5">
					Let's create a collection
				</Typography>
				<Divider />
				<Grid container css={css`padding: 0.5em;`}>
					<Grid css={css`padding: 0.5em;`} item md={6}>
						<TextField color="secondary" variant="filled" label="Collection Name" fullWidth />
					</Grid>
					<Grid css={css`padding: 0.5em;`} item md={6}>
						<TextField color="secondary" variant="filled" label="Contract Address" fullWidth />
					</Grid>
					<Grid css={css`padding: 0.5em;`} item md={6}>
						<TextField color="secondary" variant="filled" label="Cover" fullWidth />
					</Grid>
					<Grid css={css`padding: 0.5em;`} item md={6}>
						<TextField color="secondary" variant="filled" label="Logo" fullWidth />
					</Grid>
					<Grid css={css`padding: 0.5em;`} item md={12}>
						<TextField color="secondary" variant="filled" label="Description" fullWidth multiline />
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

					<Button variant="contained" color="primary">
						Create
					</Button>
				</div>
			</Paper>
		</div>
	);
};

export default AddCollection;
