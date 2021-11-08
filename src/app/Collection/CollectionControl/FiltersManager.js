/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import React, { useState, useEffect } from 'react';
import {
	Paper,
	Chip,
	Typography,
	Checkbox,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	TextField,
	Button
} from '@mui/material';
import { Row, Col } from 'react-grid-system';

const idsParser = (ids) =>
	ids.split(',').reduce((pV, item) => {
		if (item.includes('-')) {
			const [ min, max ] = item.split('-');
			if ((!min && min !== 0) || isNaN(min)) return [ ...pV ];
			if ((!max && max !== 0) || isNaN(max)) return [ ...pV ];
			if (Number(min) > Number(max)) return [ ...pV ];
			if (min == max) return [ ...pV, Number(min) ];
			return [ ...pV, ...Array(max - min).fill(0).map((v, i) => Number(Number(min) + i)), Number(max) ];
		}
		if ((!item && item !== 0) || isNaN(item)) return [ ...pV ];
		return [ ...pV, Number(item) ];
	}, []);

const FilterManager = ({ filters, setFilterIds, removeFilter, sortBy, setSortBy }) => {
	const classes = {};
	const [ ids, setIds ] = useState('');

	useEffect(
		() => {
			if (ids) {
				setFilterIds(idsParser(ids));
			} else {
				setFilterIds([]);
			}
		},
		[ ids ]
	);

	return (
		<div>
			<Row>
				<Col md={6}>
					<Typography className={classes.title} variant="h5">
						Filters
					</Typography>
				</Col>

				<Col md={3}>
					<TextField
						label="Filter IDs"
						placeholder="Eg: 1,2,3,10-15"
						value={ids}
						onChange={(e) => setIds(e.target.value)}
						variant="outlined"
						size="small"
						color="secondary"
					/>
				</Col>

				<Col md={3}>
					<FormControl
						color="secondary"
						size="small"
						fullWidth
						variant="outlined"
					>
						<InputLabel id="demo-simple-select-outlined-label">Sort By</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							label="Sort By"
						>
							<MenuItem value="normalized">Rarity - High to Low</MenuItem>
							<MenuItem value="normalized-r">Rarity - Low to High</MenuItem>
							<MenuItem value="id">ID - Hight to Low</MenuItem>
							<MenuItem value="id-r">ID - Low to High</MenuItem>
						</Select>
					</FormControl>
				</Col>
			</Row>
			<div css={css`margin-top: 1em`}>
				<div>
					{filters
						.filter((fl) => fl.variant === 'trait_exist' || fl.variant === 'specific_trait')
						.map((filter, index) => (
							<Chip
                            css={css`margin-right: 1em`}
								color="secondary"
								size="small"
								onDelete={() => removeFilter(index)}
								className={classes.chip}
								label={filter.payload.join('-')}
							/>
						))}
				</div>
			</div>
		</div>
	);
};

export default FilterManager;
