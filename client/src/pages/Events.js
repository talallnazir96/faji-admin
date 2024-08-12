import React, { useState } from 'react';
import { Typography, Grid, Button, IconButton, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Snackbar, Alert 
, Tab} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom'; 
import { useMediaQuery, useTheme } from '@mui/material';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Events() {

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
    { id: 1, title: 'Party A', date: '2024-07-10', time: '18:00', seats: 100, location: 'Location A', price: '$50', status: 'Approved' },
    { id: 2,title: 'Party B', date: '2024-07-15', time: '20:00', seats: 200, location: 'Location B', price: '$75', status: 'Declined' },
    
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [columnDefs] = useState([
    { headerName: 'Title', field: 'title', filter: true, floatingFilter: true },
    { headerName: 'Date', field: 'date', filter: true, floatingFilter: true },
    { headerName: 'Time', field: 'time', filter: true, floatingFilter: true },
    {
      headerName: 'Status',
      field: 'status',
      editable: true,
      cellRenderer: (params) => {
        const handleChange = (event) => {
          const newValue = event.target.value;
          setSnackbarOpen(true)
          setSnackbarMessage('Event Status Updated Successfully!');
          setSnackbarSeverity('success');
          params.setValue(newValue); // Update the grid value
        };

        return (
          <select
            value={params.value}
            onChange={handleChange}
            style={{
              padding: '5px',
              fontSize: '14px',
              border: 'none',
              borderRadius: '4px',
              backgroundColor: 'transparent',
              color: '#333',
            }}
          >
            <option value="approved">Approved</option>
            <option value="declined">Declined</option>
            <option value="req_info">Need Info.</option>
          </select>
        );
      },
    },
    { headerName: 'Seats', field: 'seats', filter: true, floatingFilter: true },
    { headerName: 'Location', field: 'location', filter: true, floatingFilter: true },
    { headerName: 'Price', field: 'price', filter: true, floatingFilter: true },
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
// Tab Data
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>

      <Grid container sx={{marginTop: {md:"9%",sm:"13%"}, marginBottom: "2%"}}>
        <Grid item xs={10} sm={10} md={10}>
          <Typography variant={getVariant()}  style={{fontFamily: 'Montserrat, sans-serif', textAlign: "left", fontWeight: "500"}}>Manage Parties</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} sx={{marginTop: "4%"}}>
          <Box   sx={{
        width: {
          xs: '100%', // For extra small screens (mobile)
          sm: '100%', // For small screens (tablet)
          md: '100%', // For medium screens (small desktops)
          lg: '100%', // For large screens (desktops)
          xl: '100%', // For extra large screens
        },
        typography: 'body1',
      }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example"   variant="scrollable" // Ensure tabs are scrollable on smaller screens
            scrollButtons="auto" >
                  <Tab label="Approved" value="1" sx={{fontFamily: 'Montserrat, sans-serif'}} />
                  <Tab label="Waiting For Information" value="2" sx={{fontFamily: 'Montserrat, sans-serif'}} />
                  <Tab label="Declined Parties" value="3" sx={{fontFamily: 'Montserrat, sans-serif'}} />
                </TabList>
              </Box>
              <TabPanel value="1" sx={{textAlign: "left", fontSize: "24px", fontFamily: 'Montserrat, sans-serif'}}>Approved Parties</TabPanel>
              <TabPanel value="2" sx={{textAlign: "left", fontSize: "24px", fontFamily: 'Montserrat, sans-serif'}}>Waiting For Information</TabPanel>
              <TabPanel value="3" sx={{textAlign: "left", fontSize: "24px", fontFamily: 'Montserrat, sans-serif'}}>Declined Parties</TabPanel>
              <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
                <AgGridReact
                  rowData={rowData}
                  columnDefs={columnDefs}
                  pagination={true}
                  paginationPageSize={6}
                  domLayout="autoHeight"
                />
              </div>
            </TabContext>
          </Box>
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
