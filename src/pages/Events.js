import React, { useState } from 'react';
import { Typography, Grid, Button, IconButton, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Snackbar, Alert } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom'; 
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Events() {
  const [rowData] = useState([
    { id: 1, title: 'Party A', date: '2024-07-10', time: '18:00', seats: 100, location: 'Location A', price: '$50', status: 'Approved' },
    { id: 2,title: 'Party B', date: '2024-07-15', time: '20:00', seats: 200, location: 'Location B', price: '$75', status: 'Declined' },
    { id: 3,title: 'Party C', date: '2024-07-20', time: '19:00', seats: 150, location: 'Location C', price: '$60', status: 'Pending' },
    { id: 4,title: 'Party D', date: '2024-07-25', time: '21:00', seats: 80, location: 'Location D', price: '$40', status: 'Approved' },
    { id: 5,title: 'Party E', date: '2024-07-30', time: '22:00', seats: 120, location: 'Location E', price: '$55', status: 'Approved' },
    { id: 6,title: 'Party E', date: '2024-07-30', time: '22:00', seats: 120, location: 'Location E', price: '$55', status: 'Declined' },
    { id: 7,title: 'Party E', date: '2024-07-30', time: '22:00', seats: 120, location: 'Location E', price: '$55', status: 'Declined' },
    { id: 8,title: 'Party E', date: '2024-07-30', time: '22:00', seats: 120, location: 'Location E', price: '$55', status: 'Declined' },
    { id: 9,title: 'Party E', date: '2024-07-30', time: '22:00', seats: 120, location: 'Location E', price: '$55', status: 'Pending' },
    { id: 10,title: 'Party E', date: '2024-07-30', time: '22:00', seats: 120, location: 'Location E', price: '$55', status: 'Pending' },
    { id: 11,title: 'Party E', date: '2024-07-30', time: '22:00', seats: 120, location: 'Location E', price: '$55', status: 'Approved' },
    { id: 12,title: 'Party E', date: '2024-07-30', time: '22:00', seats: 120, location: 'Location E', price: '$55', status: 'Approved' },
    { id: 13,title: 'Party E', date: '2024-07-30', time: '22:00', seats: 120, location: 'Location E', price: '$55', status: 'Approved' },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [columnDefs] = useState([
    { headerName: 'Title', field: 'title', filter: true, floatingFilter: true },
    { headerName: 'Date', field: 'date', filter: true, floatingFilter: true },
    { headerName: 'Time', field: 'time', filter: true, floatingFilter: true },
    { headerName: 'Seats', field: 'seats', filter: true, floatingFilter: true },
    { headerName: 'Location', field: 'location', filter: true, floatingFilter: true },
    { headerName: 'Price', field: 'price', filter: true, floatingFilter: true },
    { headerName: 'Status', field: 'status', filter: true, floatingFilter: true },
    {
      headerName: 'Actions',
      field: 'actions',
      pinned: 'right',
      width: 150,
      cellStyle: {textAlign: "left"},
      cellRenderer: (params) => (
        <Box>
          <Link
          to={{
            pathname: `/events/view-event/${params.data.id}`, // Dynamic route for detail view
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
        <Link
          to={{
            pathname: `/events/update-event/${params.data.id}`, // Dynamic route for detail view
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
    setSnackbarMessage('Event Deleted Successfully!');
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
          <Typography variant='h4' style={{fontFamily: 'Montserrat, sans-serif', textAlign: "left", fontWeight: "500"}}>Manage Parties</Typography>
        </Grid>
        {/* <Grid item xs={2} sm={2} md={2} align="right">
          <Button variant="outlined" color='customColor' startIcon={<AddCircleIcon />}>Add New</Button>
        </Grid> */}
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
                Are you sure you want to delete this event?
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

export default Events;
