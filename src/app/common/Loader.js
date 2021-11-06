/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import GridLoader from 'react-spinners/GridLoader';
import { useTheme } from '@mui/material'

const Loader = ({loading}) => {
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
			<GridLoader color={theme.palette.primary.main} loading={true}  size={40} />
		</div>
	);
};

export default Loader