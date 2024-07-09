import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { Button, Box, Typography, Input, FormControl, FormHelperText, Grid
    , Snackbar, Alert } from '@mui/material';
const initialTemplates = [
    { id: 1, title: 'FAJI App', short_desc: 'Organize your events smoothly', phone_num: '+1726788954', email: 'faji@outlook.com', currency: '$' },
  ];

const Settings = () => {
  const  id  = 1;

  const [template, setTemplate] = useState({ title: '', short_desc: '', phone_num: '', email: '', currency: '' });
  const [isEditMode, setIsEditMode] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    if (id) {
      const existingTemplate = initialTemplates.find(t => t.id === parseInt(id, 10));
      console.log(existingTemplate)
      if (existingTemplate) {
        setTemplate(existingTemplate);
        setIsEditMode(true);
      }
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditMode) {
        console.log("aaaaa")
        setSnackbarOpen(true)
        setSnackbarMessage('Settings Updated successfully!');
        setSnackbarSeverity('success');
    } else {
        setSnackbarOpen(true)
        setSnackbarMessage('Post Created successfully!');
        setSnackbarSeverity('success');
    }
    
    
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexWrap: 'wrap', margin: "8% auto 2%", width: "80%" }}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h4" sx={{fontFamily: 'Montserrat, sans-serif', textAlign: "left", fontWeight: "500"}}>Application Settings</Typography>
            </Grid>
        </Grid>
        <Grid container sx={{border: "1px solid #eee", borderRadius: "10px", marginTop: "4%", padding: "2%"}} spacing={1}>
            <Grid item xs={12} sm={12} md={12}>
            <Typography variant="h6" sx={{fontFamily: 'Montserrat, sans-serif', textAlign: "left", fontWeight:"400"}}>Application Detail</Typography>
                <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "90%" }}>
                    <Input
                    aria-describedby="title"
                    required
                    inputProps={{
                        'aria-label': 'title',
                    }}
                    fullWidth
                    name="title"
                    value={template.title}
                    onChange={handleChange}
                    type="text"
                    />
                    <FormHelperText id="title">Application Name</FormHelperText>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "90%" }}>
                    <Input
                    aria-describedby="short_desc"
                    required
                    inputProps={{
                        'aria-label': 'short_desc',
                    }}
                    fullWidth
                    name="short_desc"
                    value={template.short_desc}
                    onChange={handleChange}
                    type="text"
                    />
                    <FormHelperText id="short_desc">Application Slogan</FormHelperText>
                </FormControl>
            </Grid>
        </Grid>
        <Grid container sx={{border: "1px solid #eee", borderRadius: "10px", marginTop: "4%", padding: "2%"}} spacing={1}>
          <Grid item xs={12} sm={12} md={12}>
            <Typography variant="h6" sx={{fontFamily: 'Montserrat, sans-serif', textAlign: "left", fontWeight:"400"}}>Contact Information</Typography>
                <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "90%" }}>
                    <Input
                    aria-describedby="phone_num"
                    required
                    inputProps={{
                        'aria-label': 'phone_num',
                    }}
                    fullWidth
                    name="phone_num"
                    value={template.phone_num}
                    onChange={handleChange}
                    type="text"
                    />
                    <FormHelperText id="phone_num">Contact Number</FormHelperText>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "90%" }}>
                    <Input
                    aria-describedby="email"
                    required
                    inputProps={{
                        'aria-label': 'email',
                    }}
                    fullWidth
                    name="email"
                    value={template.email}
                    onChange={handleChange}
                    type="email"
                    />
                    <FormHelperText id="email">Contact Email</FormHelperText>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "90%" }}>
                    <Input
                    aria-describedby="email"
                    required
                    inputProps={{
                        'aria-label': 'email',
                    }}
                    fullWidth
                    name="email"
                    value={template.email}
                    onChange={handleChange}
                    type="email"
                    />
                    <FormHelperText id="email">Address</FormHelperText>
                </FormControl>
            </Grid>
        </Grid>
        <Grid container sx={{border: "1px solid #eee", borderRadius: "10px", marginTop: "4%", padding: "2%"}} spacing={1}>
            <Grid item xs={12} sm={12} md={12}>
            <Typography variant="h6" sx={{fontFamily: 'Montserrat, sans-serif', textAlign: "left", fontWeight:"400"}}>Currency</Typography>
                <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "90%" }}>
                    <Input
                    aria-describedby="currency"
                    required
                    inputProps={{
                        'aria-label': 'currency',
                    }}
                    fullWidth
                    name="currency"
                    value={template.currency}
                    onChange={handleChange}
                    type="text"
                    />
                    <FormHelperText id="currency">Currency</FormHelperText>
                </FormControl>
            </Grid>
        </Grid>
        <Grid container sx={{ marginTop: "4%"}} spacing={1}>
            <Grid item xs={12} sm={12} md={12} sx={{margin: "auto"}}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
                </Button>
            </Grid>
        </Grid>
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
  </Box>
  );

};

export default Settings;
