import React, { useState } from 'react';
import {TextField, Box, Button, Typography, Input, InputAdornment, FormControl, FormHelperText, Grid
    ,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Snackbar, Alert
} from '@mui/material';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const status = [
    {
      value: 'approved',
      label: 'Approved',
    },
    {
      value: 'pending',
      label: 'Pending',
    },
    {
      value: 'declined',
      label: 'Declined',
    }
  ];

const UpdateEvent = () => {
    const [formData, setFormData] = useState({
        event_title: 'Party A',
        event_date: '2023-07-06',
        event_organizer: 'John Doe',
        event_status: 'approved',
        event_loc: 'San Francisco',
        event_tickets_price: '50',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum semper mauris non sodales. Integer consectetur, elit ac pulvinar laoreet, arcu urna hendrerit diam, sit amet cursus nibh sem et lorem. Nunc elementum mauris ut blandit mattis. Sed hendrerit, nisi ut porta porta, diam ante semper metus, a venenatis ligula ante at lacus. Suspendisse venenatis sagittis mi, in dictum metus fringilla vitae. Donec ultricies nunc vitae dapibus ornare. Aliquam eu bibendum diam.',
    });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setDialogOpen(true);
        console.log('Form data submitted:', formData);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };
    const handleDialogConfirm = () => {
        console.log('Form data submitted:', formData);
        setSnackbarMessage('Form submitted successfully!');
        setSnackbarSeverity('success');
        setDialogOpen(false);
        setSnackbarOpen(true);
        // Handle form submission logic (e.g., send data to the server)
      };
      const handleSnackbarClose = () => {
        setSnackbarOpen(false);
      };
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexWrap: 'wrap', margin: "8% auto 2%", width: "80%" }}>
    <div>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h4" sx={{fontFamily: 'Montserrat, sans-serif', textAlign: "left", fontWeight: "500"}}>Update Event Details</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
                <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "100%" }}>
                    <Input
                    aria-describedby="title"
                    inputProps={{
                        'aria-label': 'event_title',
                    }}
                    fullWidth
                    name="event_title"
                    value={formData.event_title}
                    onChange={handleChange}
                    type="text"
                    />
                    <FormHelperText id="title">Event Title</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
                <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "100%" }}>
                    <Input  
                    aria-describedby="date"
                    inputProps={{
                        'aria-label': 'weight',
                    }}
                    fullWidth
                    name="event_date"
                    value={formData.event_date}
                    onChange={handleChange}
                    type="date"
                    />
                    <FormHelperText id="date">Event Date</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
                <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "100%" }}>
                    <Input  
                    aria-describedby="organizer"
                    inputProps={{
                        'aria-label': 'weight',
                    }}
                    fullWidth
                    name="event_organizer"
                    value={formData.event_organizer}
                    onChange={handleChange}
                    />
                    <FormHelperText id="organizer">Event Organizer</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
                <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "100%" }}>
                    <TextField
                        id="standard-select-status"
                        select
                        defaultValue="Approved"
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Event Status"
                        variant="standard"
                        fullWidth
                        name="event_status"
                        value={formData.event_status}
                        onChange={handleChange}
                        >
                        {status.map((option) => (
                            <option key={option.value} value={option.value}>
                            {option.label}
                            </option>
                        ))}
                    </TextField>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
                <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "100%" }}>
                    <Input
                    aria-describedby="location"
                    name="event_loc"
                    value={formData.event_loc}
                    onChange={handleChange}
                    fullWidth
                    />
                    <FormHelperText id="location">Event Location</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
                <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "100%" }}>
                    <Input
                    id="price"
                    endAdornment={<InputAdornment position="end">$</InputAdornment>}
                    aria-describedby="price"
                    inputProps={{
                        'aria-label': 'price',
                    }}
                    name="event_tickets_price"
                    value={formData.event_tickets_price}
                    onChange={handleChange}
                    fullWidth
                    type="number"
                    />
                    <FormHelperText id="price">Ticket Price</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "100%" }}>
                    <Input
                    id="description"
                    aria-describedby="description"
                    inputProps={{
                        'aria-label': 'description',
                    }}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={6}
                    />
                    <FormHelperText id="description">Event Description</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit
                </Button>
            </Grid>
        </Grid>
        <Dialog open={dialogOpen} onClose={handleDialogClose} TransitionComponent={Transition} keepMounted aria-describedby="alert-dialog-slide-description">
            <DialogTitle sx={{textAlign: "center"}}>Are you Sure ?</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description"  sx={{textAlign: "center"}}>
                Changes that are done never get reverted once saved
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleDialogConfirm}>Save</Button>
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
    </div>
  </Box>
  );
};

export default UpdateEvent;
