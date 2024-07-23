import React, { useState } from 'react';
import { Typography, Grid, Button, IconButton, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Snackbar, Alert } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom'; 
import {  useMediaQuery, useTheme } from '@mui/material';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function PromoCode() {
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
    { id: 1, code: '123ABD!@', applicable_events: "Party A, Party B", expiry_date: '2024-07-15', discount_val: '10%'},
    { id: 2, code: '123ABD!@', applicable_events: "Party A, Party B", expiry_date: '2024-07-15', discount_val: '10%'},
    { id: 3, code: '123ABD!@', applicable_events: "Party A, Party B", expiry_date: '2024-07-15', discount_val: '10%'},
    { id: 4, code: '123ABD!@', applicable_events: "Party A, Party B", expiry_date: '2024-07-15', discount_val: '10%'},
    { id: 5, code: '123ABD!@', applicable_events: "Party A, Party B", expiry_date: '2024-07-15', discount_val: '10%'},
    { id: 6, code: '123ABD!@', applicable_events: "Party A, Party B", expiry_date: '2024-07-15', discount_val: '10%'},
    { id: 7, code: '123ABD!@', applicable_events: "Party A, Party B", expiry_date: '2024-07-15', discount_val: '10%'},
    { id: 8, code: '123ABD!@', applicable_events: "Party A, Party B", expiry_date: '2024-07-15', discount_val: '10%'},
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [columnDefs] = useState([
    { headerName: 'Promo Code', field: 'code', filter: true, floatingFilter: true },
    { headerName: 'Applicable Events', field: 'applicable_events', filter: true, floatingFilter: true , flex: 5},
    { headerName: 'Expiry Date', field: 'expiry_date', filter: true, floatingFilter: true },
    { headerName: 'Discount Value', field: 'discount_val', filter: true, floatingFilter: true},
    {
      headerName: 'Actions',
      field: 'actions',
      width: 150,
      cellStyle: {textAlign: "left"},
      cellRenderer: (params) => (
        <Box>
        <Link
          to={{
            pathname: `/promo/edit-promo/${params.data.id}`, // Dynamic route for detail view
            state: { selectedItem: params.data }, // Pass selected item as state
          }}
          style={{ textDecoration: 'none' }}
        >
          <IconButton
            aria-label="edit"
            onClick={() => handleEdit(params.data)}
            sx={{fontSize: "medium"}}
          >
            <EditIcon sx={{fontSize: 16, color: "#479f76"}} />
          </IconButton>
        </Link>
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(params.data)}
            sx={{fontSize: "medium"}}
          >
            <DeleteIcon sx={{fontSize: 16, color: "#dc3545"}} />
          </IconButton>
        </Box>
      ),
    },
  ]);


  const handleView = (data) => {
    console.log('View', data);
  };

  const handleEdit = (data) => {
    console.log('Edit', data);
  };

  const handleDelete = (data) => {
    setDialogOpen(true);
    console.log('Delete', data);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
};
const handleDialogConfirm = () => {
    setSnackbarMessage('Promocode Deleted Successfully!');
    setSnackbarSeverity('success');
    setDialogOpen(false);
    setSnackbarOpen(true);
    // Handle form submission logic (e.g., send data to the server)
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <>
      <Grid container sx={{marginTop: "9%", marginBottom: "2%"}}>
        <Grid item xs={8} sm={8} md={10}>
          <Typography variant={getVariant()}  style={{fontFamily: 'Montserrat, sans-serif', textAlign: "left", fontWeight: "500"}}>Manage Promocodes</Typography>
        </Grid>
        <Grid item xs={4} sm={4} md={2} align="right">
          <Button component={Link} to="/promo/add-promo" variant="outlined" color='customColor' startIcon={<AddCircleIcon />}>Add New</Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} sx={{marginTop: "4%"}}>
          <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={6}
              domLayout="autoHeight"
            />
          </div>
        </Grid>
      </Grid> 
      <Dialog open={dialogOpen} onClose={handleDialogClose} TransitionComponent={Transition} keepMounted aria-describedby="alert-dialog-slide-description">
            <DialogTitle sx={{textAlign: "center"}}>Are you Sure ?</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description"  sx={{textAlign: "center"}}>
                Are you sure you want to delete this promocode?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleDialogConfirm}>Delete</Button>
            </DialogActions>
        </Dialog>
        <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose}>
            <Alert
                onClose={handleSnackbarClose}
                severity={snackbarSeverity}
                variant="filled"
                sx={{ width: '100%' }}
                >
                {snackbarMessage}
            </Alert>
        </Snackbar> 
    </>
  );
}

export default PromoCode;
