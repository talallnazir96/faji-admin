import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import logo from '../assets/LogoBlack.png';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  top: 0,
  bottom: 'auto',
}));

function Navbar() {
  return (
    <StyledAppBar position="fixed" sx={{backgroundColor: "#FFF"}}>
      <Toolbar style={{minHeight: "55px"}}> 
      <Box display="flex" alignItems="center" padding={1} width="20%">
        <img src={logo} alt="Logo" style={{ width: '20px', marginBottom: '10px' }} />
        <Typography variant="h6" style={{color: '#4E4E4E', paddingLeft: '4px', fontFamily: 'Montserrat, sans-serif', fontSize: "20px", fontWeight: "800"}}>FAJI admin</Typography>
      </Box> 
      <Box sx={{ flexGrow: 1 }}>
          <TextField
            variant="outlined"
            placeholder="Search"
            size="small"
            sx={{ backgroundColor: 'rgba(246, 246, 246, 0.53)', borderRadius: 1, width: "90%", flexGrow: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Typography variant='p' sx={{color: "#4E4E4E", fontFamily: 'Montserrat, sans-serif',}}>Hi Edger</Typography>
      </Toolbar>
    </StyledAppBar>
  );
}

export default Navbar;
