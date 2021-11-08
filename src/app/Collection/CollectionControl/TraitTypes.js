/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import {
	makeStyles,
	Paper,
	Checkbox,
	Typography,
	IconButton,
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction
} from '@mui/material';
import { Details, Minimize, Maximize } from '@mui/icons-material';

const TraitTypes = ({ traits, filters, addFilter, removeFilter, selectedList, setSelectedList, tokensCount }) => {
	const classes = {};

	const normalizeTraits = () => {
		return traits.reduce((pV, cV) => {
			let trait = {};
			if (pV.find((trait) => trait.trait_type === cV.trait_type)) {
				trait = { ...pV.find((trait) => trait.trait_type == cV.trait_type) };
				trait.variants.push(cV.value);
				trait.amount += cV.amount;
				return pV.map((tt) => {
					if (tt.trait_type !== cV.trait_type) return tt;
					return trait;
				});
			} else {
				trait.trait_type = cV.trait_type;
				trait.variants = [ cV.value ];
				trait.amount = cV.amount;
				return [ ...pV, trait ];
			}
		}, []);
	};
	return (
		<div>
			<List>
				{normalizeTraits().map((trait) => {
					const checkedIndex = filters.findIndex((filter) => {
						return (
							filter.variant === 'trait_exist' &&
							filter.payload &&
							filter.payload.includes(trait.trait_type)
						);
					});
					return (
						<ListItem
							css={
								selectedList == trait.trait_type ? (
									(theme) => css`color: ${theme.palette.secondary.main};`
								) : (
									''
								)
							}
							onClick={() => setSelectedList(trait.trait_type)}
							button
							key={trait.trait_type}
						>
							<ListItemText
								primary={`${trait.trait_type} - ${trait.variants.length}  variant`}
								secondary={`${trait.amount}  have this trait (${parseFloat(
									trait.amount * 100 / tokensCount
								) > 100
									? 100
									: parseFloat(trait.amount * 100 / tokensCount).toFixed(2)}%) `}
							/>

							<ListItemSecondaryAction>
								<Checkbox
									color="secondary"
									checked={checkedIndex > -1}
									onChange={() => {
										if (checkedIndex > -1) {
											removeFilter(checkedIndex);
										} else {
											addFilter({
												variant: 'trait_exist',
												payload: [ trait.trait_type ]
											});
										}
									}}
								/>
							</ListItemSecondaryAction>
						</ListItem>
					);
				})}
			</List>
		</div>
	);
};

export default TraitTypes;
