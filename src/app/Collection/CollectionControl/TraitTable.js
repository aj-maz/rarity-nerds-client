import React, { useEffect, useState } from 'react';
import { Checkbox, Typography, IconButton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TraitTable = ({ traitName, filters, addFilter, removeFilter, traits, tokensCount }) => {
	const classes = {};

	const [ total, setTotal ] = useState(1);
	const [ timerInterval, setTI ] = useState(0);
	const [ minimize, setMinimize ] = useState(false);

	return (
		<TableContainer >
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell />
						<TableCell align="center">Value</TableCell>
						<TableCell align="center">Amount</TableCell>
						<TableCell align="center">Percentage</TableCell>
						<TableCell align="center">Score</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{traits
						.filter((trait) => trait.trait_type === traitName)
						.sort((a, b) => a.amount - b.amount)
						.map((trait) => {
							const checkedIndex = filters.findIndex((filter) => {
								return (
									filter.variant === 'specific_trait' &&
									filter.payload &&
									filter.payload.includes(trait.trait_type) &&
									filter.payload.includes(trait.value)
								);
							});

							return (
								<TableRow key={`${trait.value}#${trait.amount}`}>
									<TableCell align="center">
										<Checkbox
											checked={checkedIndex > -1}
											onChange={() => {
												if (checkedIndex > -1) {
													removeFilter(checkedIndex);
												} else {
													addFilter({
														variant: 'specific_trait',
														payload: [ trait.trait_type, trait.value ]
													});
												}
											}}
                                            color="secondary"
										/>
									</TableCell>

									<TableCell align="center">{trait.value}</TableCell>
									<TableCell align="center">{trait.amount}</TableCell>
									<TableCell align="center">
										{(trait.amount * 100 / tokensCount).toFixed(2)}
									</TableCell>
									<TableCell align="center">{(tokensCount / trait.amount).toFixed(2)}</TableCell>
								</TableRow>
							);
						})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TraitTable;
