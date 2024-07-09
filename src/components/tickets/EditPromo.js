import React, { useState } from 'react';
import {TextField, Box, Button, Typography, Input, InputAdornment, FormControl, FormHelperText, Grid
    ,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Snackbar, Alert
    , InputLabel, Select, MenuItem, Chip, OutlinedInput
} from '@mui/material';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const EditPromo = () => {
    const [selectedItems, setSelectedItems] = useState([]);

    const [formData, setFormData] = useState({
        promocode: 'ABCD!@#!@@',
        expiry_date: '2023-07-06',
        discount: '50',
    });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name==='events_list') {
            setSelectedItems(
                // On autofill we get a stringified value.
                typeof value === 'string' ? value.split(',') : value,
                );
        }
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };
    const items = ['Party A', 'Party B', 'Party C', 'Party D', 'Party E'];
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
                <Typography variant="h4" sx={{fontFamily: 'Montserrat, sans-serif', textAlign: "left", fontWeight: "500"}}>Update Promocode Details</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
                <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "100%" }}>
                    <Input
                    aria-describedby="promocode"
                    inputProps={{
                        'aria-label': 'promocode',
                    }}
                    fullWidth
                    name="promocode"
                    value={formData.promocode}
                    onChange={handleChange}
                    type="text"
                    />
                    <FormHelperText id="promocode">Promocode</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
                <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "100%" }}>
                    <Input  
                    aria-describedby="expiry_date"
                    inputProps={{
                        'aria-label': 'weight',
                    }}
                    fullWidth
                    name="expiry_date"
                    value={formData.expiry_date}
                    onChange={handleChange}
                    type="date"
                    />
                    <FormHelperText id="expiry_date">Expiry Date</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <FormControl variant="standard"  sx={{ m: 1, mt: 3, width: "100%" }}>
                {/* <InputLabel id="multiple-select-label">Select Options</InputLabel> */}
                    <Select
                        labelId="multiple-select-label"
                        multiple
                        name='events_list'
                        variant="standard"
                        value={selectedItems}
                        onChange={handleChange}
                        input={<OutlinedInput label="Select Options" />}
                        renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                            <Chip key={value} label={value} />
                            ))}
                        </Box>
                        )}
                    >
                        {items.map((item) => (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText id="expiry_date">Applied on following events</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
                <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "100%" }}>
                    <Input
                    id="discount"
                    endAdornment={<InputAdornment position="end">%</InputAdornment>}
                    aria-describedby="discount"
                    inputProps={{
                        'aria-label': 'discount',
                    }}
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    fullWidth
                    type="number"
                    />
                    <FormHelperText id="discount">Discount Percentage</FormHelperText>
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

export default EditPromo;
