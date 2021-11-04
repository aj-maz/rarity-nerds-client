/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button, Divider } from '@mui/material';


// Go for creating collections
// Table of collections

const AdminPage = () => {
    return <div css={css`padding: 2em`}>
        <Button variant="text" color="primary">Add Collection</Button>
        <Divider css={css`margin-top: 0.5em`} />
    </div>
}

export default AdminPage