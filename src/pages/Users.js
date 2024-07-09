import React, { useState } from 'react';
import { Typography, Grid, Button, IconButton, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Snackbar, Alert } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom'; 
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Users() {
  const [rowData] = useState([
    { id: 1, name: 'Dummy', email: 'abc@gmail.com', user_role: 'Organizer', registeration_date: '2024-07-15', status: 'active', tickets_purchased: '20'},
    { id: 2, name: 'Dummy', email: 'abc@gmail.com', user_role: 'Organizer', registeration_date: '2024-07-15', status: 'active', tickets_purchased: '10'},
    { id: 3, name: 'Dummy', email: 'abc@gmail.com', user_role: 'Admin', registeration_date: '2024-07-15', status: 'active', tickets_purchased: '0'},
    { id: 4, name: 'Dummy', email: 'abc@gmail.com', user_role: 'Admin', registeration_date: '2024-07-15', status: 'active', tickets_purchased: '0'},
    { id: 5, name: 'Dummy', email: 'abc@gmail.com', user_role: 'Organizer', registeration_date: '2024-07-15', status: 'active', tickets_purchased: '50'},
    { id: 6, name: 'Dummy', email: 'abc@gmail.com', user_role: 'Organizer', registeration_date: '2024-07-15', status: 'active', tickets_purchased: '20'},
    { id: 7, name: 'Dummy', email: 'abc@gmail.com', user_role: 'Attendee', registeration_date: '2024-07-15', status: 'inactive', tickets_purchased: '20'},
    { id: 8, name: 'Dummy', email: 'abc@gmail.com', user_role: 'Organizer', registeration_date: '2024-07-15', status: 'active', tickets_purchased: '20'},
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [columnDefs] = useState([
    { headerName: 'User ID', field: 'id', filter: true, floatingFilter: true },
    { headerName: 'User Name', field: 'name', filter: true, floatingFilter: true },
    { headerName: 'Email', field: 'email', filter: true, floatingFilter: true },
    { headerName: 'User Role', field: 'user_role', filter: true, floatingFilter: true },
    { headerName: 'Registeration Date', field: 'registeration_date', filter: true, floatingFilter: true },
    { headerName: 'Status', field: 'status', filter: true, floatingFilter: true },
    { headerName: 'Tickets Purchased', field: 'tickets_purchased', filter: true, floatingFilter: true },
    {
      headerName: 'Actions',
      pinned: 'right',
      field: 'actions',
      width: 150,
      cellStyle: {textAlign: "left"},
      cellRenderer: (params) => (
        <Box>
        <Link
          to={{
            pathname: `/users/edit-user/${params.data.id}`, // Dynamic route for detail view
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
    setSnackbarMessage('User Deleted Successfully!');
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
      <Grid container sx={{marginTop: "8%", marginBottom: "2%"}}>
        <Grid item xs={10} sm={10} md={10}>
          <Typography variant='h4' style={{fontFamily: 'Montserrat, sans-serif', textAlign: "left", fontWeight: "500"}}>Manage Users</Typography>
        </Grid>
        <Grid item xs={2} sm={2} md={2} align="right">
          <Button component={Link} to="/users/add-user" variant="outlined" color='customColor' startIcon={<AddCircleIcon />}>Add New</Button>
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
                Are you sure you want to delete this user?
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

export default Users;
