/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material'
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography onClick={() => navigate('/')}  css={css`font-weight: bold; cursor: pointer;`} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rarity Nerds
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
