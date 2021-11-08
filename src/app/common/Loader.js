/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import GridLoader from 'react-spinners/GridLoader';
import { useTheme } from '@mui/material'

const Loader = ({loading, size = 40}) => {
    const theme = useTheme()
    return (
		<div
			css={css`
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			`}
		>
			<GridLoader color={theme.palette.secondary.main} loading={true}  size={size} />
		</div>
	);
};

export default Loader