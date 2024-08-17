import React, { useState,useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import logo from '../assets/LogoBlack.png';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Container, Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import constant from "../constant";
import {useMediaQuery, useTheme } from '@mui/material';
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  top: 0,
  bottom: 'auto',

}));

const StyledToolBar = styled(Toolbar)({
  display:"flex",
  justifyContent:"space-between",

});
const StyledLogo = styled(Box)({
 display:"flex",
  alignItems:"center",
});

const Search = styled("Box")(({ theme }) => ({
 
  flex: 1,
  display:"flex",
  justifyContent:"center",
  mx:"auto",

}));
function Navbar() {
  const [userDetails, setUserDetails] = useState([]);
  const [error, setError] = useState("");
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));
  const isXl = useMediaQuery(theme.breakpoints.only('xl'));
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");

      if (userId) {
        try {
          const response = await fetch(`${constant.apiUrl}/auth/users/${userId}`);
          const result = await response.json();
console.log(result);
          if (response.ok) {
            setUserDetails(result);
          } else {
            setError(result.message);
          }
        } catch (err) {
          setError("An error occurred while fetching user details.");
        }
      } else {
        setError("User ID not found in local storage.");
      }
    };

    fetchUserData();
  }, []);
  console.log(userDetails);
  const getVariant = () => {
    if (isXs) return 'h5';
    if (isSm) return 'h5';
    if (isMd) return 'h4';
    if (isLg) return 'h4';
    if (isXl) return 'h3';
    return 'body1'; // Default variant
  };
  return (
    <>
    <AppBar position="fixed" sx={{ backgroundColor: "#fff" }}>
      <StyledToolBar>
        <StyledLogo >
        <img src={logo} alt="Logo" sx={{display:{xs:"none",sm:"block"}}} style={{ width: '15px', marginBottom: '10px' }} />
      <Typography varient="h6" sx={{fontFamily: 'Montserrat, sans-serif', fontWeight: 800,color: '#4E4E4E',display:{xs:"none",sm:"block"}}}>
      FAJI admin
        </Typography>
          </StyledLogo>
          <Search>
          <TextField
                variant="outlined"
                placeholder="Search"
                fullWidth
                size="small"
                sx={{
                  backgroundColor: 'rgba(246, 246, 246, 0.53)',
                  borderRadius: 1,
                  justifyContent:"center",
                  width: { xs: "70%", sm: "80%", md: "70%", lg: "80%", xl: "90%" },
                  
                }}
                InputProps={{
                  sx: {
                    '&::placeholder': {
              fontSize: { xs: '12px', sm: '14px', md: '16px' }, // Adjust the size as needed
              fontFamily: 'Montserrat, sans-serif', // Optionally set the font family
            },
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: { xs: '16px', sm: '20px', md: '24px' } }}/>
                    </InputAdornment>
                  ),
                }}
              />
            </Search>
            <Typography variant='h6' sx={{ color: "#4E4E4E", fontFamily: 'Montserrat, sans-serif',fontSize:{xs:'11px',md:"15px"}, display: { xs: 'block', sm: 'block' } }}>
              Hi {userDetails.username}
            </Typography>
        </StyledToolBar>

      </AppBar>
    
      {/* <StyledAppBar position="fixed" sx={{ backgroundColor: "#fff" }}>
        <Toolbar>
         
        <Box display="flex" alignItems="center" padding={1} sx={{ width: { xs: "100%", md: "20%" } }}>
              <img src={logo} alt="Logo" style={{ width: '15px', marginBottom: '10px' }} />
              <Typography
               variant={getVariant()}
                sx={{
                  mr: 2,
                  
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 800,
                  fontSize: { xs: "12px",md:"16px",lg:"16px" },
                  color: '#4E4E4E',
                  paddingLeft: '4px',
                  textDecoration: 'none',
                }}
              >
                FAJI admin
              </Typography>
            </Box>
            <Box sx={{flexGrow:{md:"1"},display:"flex",justifyContent:"center"}}>
              <TextField
                variant="outlined"
                placeholder="Search"
               
               size="small"
              
                sx={{
                  backgroundColor: 'rgba(246, 246, 246, 0.53)',
                  borderRadius: 1,
                  justifyContent:"center",
             
                  width: { xs: "70%", sm: "80%", md: "90%", lg: "90%", xl: "100%" },
                  padding: 0,
                }}
                InputProps={{
                  sx: {
                    '&::placeholder': {
              fontSize: { xs: '12px', sm: '14px', md: '16px' }, // Adjust the size as needed
              fontFamily: 'Montserrat, sans-serif', // Optionally set the font family
            },
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: { xs: '16px', sm: '20px', md: '24px' } }}/>
                    </InputAdornment>
                  ),
                }}
              />
          </Box>
            <Typography variant='body1' sx={{ color: "#4E4E4E", fontFamily: 'Montserrat, sans-serif',fontSize:{xs:'11px',md:"15px"}, display: { xs: 'block', sm: 'block' } }}>
              Hi Edger
            </Typography>
        </Toolbar>
      </StyledAppBar> */}
   
     
    
    </>


  );
}

export default Navbar;
