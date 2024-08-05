import React, {useState} from "react";
import { Typography, Grid ,TextField, Button , Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Snackbar, Alert } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {  useMediaQuery, useTheme } from '@mui/material';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const auditLogs = [
    {
        id: 1,
        timestamp: "2024-07-10T10:00:00Z",
        user: {
            id: 123,
            username: "admin_user"
        },
        eventname: "Party A",
        eventId: 456,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin justo mi, ornare ac dictum vitae, rutrum ac nunc. Fusce tellus nulla, efficitur quis mollis et, cursus sit amet sapien. Mauris dictum rhoncus massa id tempus. Suspendisse lorem justo, lacinia vitae efficitur vel, vestibulum a mauris. Aliquam fringilla interdum massa tincidunt congue. Morbi pellentesque rutrum elementum. Nullam dapibus metus in rutrum dapibus. In quis magna leo."
    },
    {
        id: 4,
        timestamp: "2024-07-10T10:00:00Z",
        user: {
            id: 123,
            username: "admin_user"
        },
        eventname: "Party A",
        eventId: 456,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin justo mi, ornare ac dictum vitae, rutrum ac nunc. Fusce tellus nulla, efficitur quis mollis et, cursus sit amet sapien. Mauris dictum rhoncus massa id tempus. Suspendisse lorem justo, lacinia vitae efficitur vel, vestibulum a mauris. Aliquam fringilla interdum massa tincidunt congue. Morbi pellentesque rutrum elementum. Nullam dapibus metus in rutrum dapibus. In quis magna leo."
    },
    {
        id: 2,
        timestamp: "2024-07-10T10:00:00Z",
        user: {
            id: 123,
            username: "admin_user"
        },
        eventname: "Party A",
        eventId: 456,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin justo mi, ornare ac dictum vitae, rutrum ac nunc. Fusce tellus nulla, efficitur quis mollis et, cursus sit amet sapien. Mauris dictum rhoncus massa id tempus. Suspendisse lorem justo, lacinia vitae efficitur vel, vestibulum a mauris. Aliquam fringilla interdum massa tincidunt congue. Morbi pellentesque rutrum elementum. Nullam dapibus metus in rutrum dapibus. In quis magna leo."
    },
    {
        id: 3,
        timestamp: "2024-07-10T10:00:00Z",
        user: {
            id: 123,
            username: "admin_user"
        },
        eventname: "Party A",
        eventId: 456,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin justo mi, ornare ac dictum vitae, rutrum ac nunc. Fusce tellus nulla, efficitur quis mollis et, cursus sit amet sapien. Mauris dictum rhoncus massa id tempus. Suspendisse lorem justo, lacinia vitae efficitur vel, vestibulum a mauris. Aliquam fringilla interdum massa tincidunt congue. Morbi pellentesque rutrum elementum. Nullam dapibus metus in rutrum dapibus. In quis magna leo."
    },
    {
        id: 5,
        timestamp: "2024-07-10T11:00:00Z",
        user: {
            id: 124,
            username: "admin_user2"
        },
        eventname: "Party B",
        eventId: 456,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin justo mi, ornare ac dictum vitae, rutrum ac nunc. Fusce tellus nulla, efficitur quis mollis et, cursus sit amet sapien. Mauris dictum rhoncus massa id tempus. Suspendisse lorem justo, lacinia vitae efficitur vel, vestibulum a mauris. Aliquam fringilla interdum massa tincidunt congue. Morbi pellentesque rutrum elementum. Nullam dapibus metus in rutrum dapibus. In quis magna leo."
    },
    {
        id: 6,
        timestamp: "2024-07-10T12:00:00Z",
        user: {
            id: 123,
            username: "admin_user"
        },
        eventname: "Party C",
        eventId: 456,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin justo mi, ornare ac dictum vitae, rutrum ac nunc. Fusce tellus nulla, efficitur quis mollis et, cursus sit amet sapien. Mauris dictum rhoncus massa id tempus. Suspendisse lorem justo, lacinia vitae efficitur vel, vestibulum a mauris. Aliquam fringilla interdum massa tincidunt congue. Morbi pellentesque rutrum elementum. Nullam dapibus metus in rutrum dapibus. In quis magna leo."
    }
    
];
const Reports = () => {
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
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const columnDefs = [
        { headerName: "ID", field: "id", filter: true, floatingFilter: true },
        { headerName: "Timestamp", field: "timestamp", filter: true, floatingFilter: true },
        { headerName: "Report Desc.", field: "description",  filter: true, floatingFilter: true, editable: true},
        { headerName: "Reported By", field: "user.username" ,  filter: true, floatingFilter: true},
        { headerName: "User ID", field: "user.id",  filter: true, floatingFilter: true },
        { headerName: "Reported Event", field: "eventname",  filter: true, floatingFilter: true },
        { headerName: "Event ID", field: "eventId",  filter: true, floatingFilter: true },
        {
            headerName: 'Action',
            field: 'status',
            editable: true,
            pinned: "right",
            cellRenderer: (params) => {
              const handleChange = (event) => {
                const newValue = event.target.value;
                if(newValue === "req_info") {
                    setDialogOpen(true);
                }
                if(newValue === "spam") {
                    setSnackbarOpen(true)
                    setSnackbarMessage('Event Marked as Spam!');
                    setSnackbarSeverity('success');
                }
                if(newValue === "declined") {
                    setSnackbarOpen(true)
                    setSnackbarMessage('Event Declined!');
                    setSnackbarSeverity('success');
                }
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
                  <option value="spam">Marked as Spam</option>
                  <option value="req_info">Request Info.</option>
                  <option value="declined">Declined</option>
                </select>
              );
            },
          },
    ];

    const defaultColDef = {
        flex: 1,
        minWidth: 100,
        resizable: true
    };
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
      };  
      const handleClose = () => {
        setDialogOpen(false);
      };
    return (
        <>
        <Grid container spacing={3}  sx={{marginTop: "9%", marginBottom: "2%"}}>
            <Grid item xs={10} sm={10} md={10}>
          <Typography variant={getVariant()} style={{fontFamily: 'Montserrat, sans-serif', textAlign: "left", fontWeight: "500"}}>Escalations & Reports</Typography>
            </Grid>
            <Grid item xs={12} md={12} >
                <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={auditLogs}
                        defaultColDef={defaultColDef}
                        pagination={true}
                        paginationPageSize={6}
                        domLayout='autoHeight'
                    />
                </div>
            </Grid>
        </Grid>
        <Dialog
            open={dialogOpen}
            onClose={handleClose}
            PaperProps={{
            component: 'form',
            onSubmit: (event) => {
                event.preventDefault();
                // const formData = new FormData(event.currentTarget);
                // const formJson = Object.fromEntries(formData.entries());
                // const email = formJson.email;
                // console.log(email);
                setSnackbarMessage('Information Requested Successfully!');
                setSnackbarSeverity('success');
                setDialogOpen(false);
                setSnackbarOpen(true);
                handleClose();
            },
            }}
        >
            <DialogContent>
            <DialogContentText>
                Provide Details of information required:
            </DialogContentText>
            <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="text"
                label="Enter Details"
                type="text"
                multiline
                rows={4}
                fullWidth
                variant="standard"
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Request</Button>
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
export default Reports;