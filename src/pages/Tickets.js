import React, { useState, useRef } from 'react';
import { Typography, Grid, Button, IconButton, Box, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useMediaQuery, useTheme } from '@mui/material';
import {Link} from "react-router-dom";
function Tickets() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));
  const isXl = useMediaQuery(theme.breakpoints.only('xl'));

  const getVariant = () => {
    if (isXs) return 'h5';
    if (isSm) return 'h5';
    if (isMd) return 'h4';
    if (isLg) return 'h4';
    if (isXl) return 'h3';
    return 'body1'; // Default variant
  };
  const [rowData] = useState([
    { tId: '1234', eventName: 'Party A', userName: 'John Doe', date: '2024-07-15', price: '$50', pCode: '-' },
    { tId: '1235', eventName: 'Party B', userName: 'Jacky', date: '2024-07-15', price: '$50', pCode: 'ABC12#' },
    { tId: '1236', eventName: 'Party C', userName: 'Edger', date: '2024-07-15', price: '$50', pCode: '-' },
    { tId: '1237', eventName: 'Party D', userName: 'Talal', date: '2024-07-15', price: '$50', pCode: '-' },
    { tId: '1238', eventName: 'Party E', userName: 'Vigen', date: '2024-07-15', price: '$50', pCode: '-' },
    { tId: '1239', eventName: 'Party F', userName: 'Adrian', date: '2024-07-15', price: '$50', pCode: '-' },
    { tId: '1240', eventName: 'Party G', userName: 'Livingstone', date: '2024-07-15', price: '$50', pCode: '-' },
  ]);
  
  const [columnDefs] = useState([
    { headerName: 'Ticket ID', field: 'tId', filter: true, floatingFilter: true },
    { headerName: 'Party Name', field: 'eventName', filter: true, floatingFilter: true },
    { headerName: 'User Name', field: 'userName', filter: true, floatingFilter: true },
    { headerName: 'Purchase Date', field: 'date', filter: true, floatingFilter: true },
    { headerName: 'Price', field: 'price', filter: true, floatingFilter: true },
    { headerName: 'Promo Code', field: 'pCode', filter: true, floatingFilter: true },
    {
      headerName: 'Actions',
      field: 'actions',
      pinned: 'right',
      width: 150,
      cellStyle: {textAlign: "center"},
      cellRenderer: (params) => (
        <Box>
          <Link
          to={{
            pathname: `/tickets/view-ticket/${params.data.tId}`, // Dynamic route for detail view
            state: { selectedItem: params.data }, // Pass selected item as state
          }}
          style={{ textDecoration: 'none' }}
        >
          <IconButton
            aria-label="view"
            onClick={() => handleView(params.data)}
            sx={{fontSize: "medium"}}
          >
            <VisibilityIcon sx={{fontSize: 16, color: "#a370f7"}} />
          </IconButton>
        </Link>
        </Box>
      ),
    },
  ]);


  const handleView = (data) => {
    console.log('View', data);
  };
  return (
    <>
      <Grid container sx={{marginTop: "9%", marginBottom: "2%"}}>
        <Grid item xs={10} sm={10} md={10}>
          <Typography variant={getVariant()} style={{fontFamily: 'Montserrat, sans-serif', textAlign: "left", fontWeight: "500"}}>Manage Tickets</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} sx={{marginTop: "4%"}}>
          <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={10}
              domLayout="autoHeight"
            />
          </div>
        </Grid>
      </Grid>   
    </>
  );
}

export default Tickets;
