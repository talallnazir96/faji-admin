import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField, Paper, Box, Typography, Input, InputAdornment, FormControl, FormHelperText, Grid
    , Snackbar, Alert, MenuItem, Chip, OutlinedInput, IconButton  } from '@mui/material';
import { AddAPhoto, Delete } from '@mui/icons-material';
const initialTemplates = [
    { id: 1, title: 'Important Announcment', short_desc: "Lorem ipsum dolor sit amet, consectetur adipiscing el", description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet accumsan enim. Aliquam erat volutpat. Proin eu eros in lacus iaculis fringilla. Maecenas non consequat tortor. Aliquam varius in dui nec malesuada. Nulla sed sapien id mi malesuada eleifend. Morbi felis ligula, venenatis ac turpis quis, sodales vehicula massa. Ut tincidunt magna quis erat tempus, ac gravida magna blandit. Nulla facilisi. Vivamus id condimentum libero, ut elementum purus.' },
  ];

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState({ name: '', subject: '', body: '', type: '' });
  const [isEditMode, setIsEditMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

  useEffect(() => {
    if (id) {
      const existingTemplate = initialTemplates.find(t => t.id === parseInt(id, 10));
      if (existingTemplate) {
        setTemplate(existingTemplate);
        setImage("https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
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
        setSnackbarMessage('Post Edited successfully!');
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
                <Typography variant="h4" sx={{fontFamily: 'Montserrat, sans-serif', textAlign: "left", fontWeight: "500"}}>{isEditMode ? "Update Post" : "Create New Post"}</Typography>
            </Grid>
        </Grid>
        <Grid container sx={{border: "1px solid #eee", borderRadius: "10px", marginTop: "4%", padding: "2%"}} spacing={1}>
            <Grid item xs={12} sm={12} md={12}>
            <Typography variant="h6" sx={{fontFamily: 'Montserrat, sans-serif', textAlign: "left", fontWeight:"400"}}>Basic Details</Typography>
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
                    <FormHelperText id="title">Post Title</FormHelperText>
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
                    <FormHelperText id="short_desc">Short Description</FormHelperText>
                </FormControl>
            </Grid>
        </Grid>
        <Grid container sx={{border: "1px solid #eee", borderRadius: "10px", marginTop: "4%", padding: "2%"}} spacing={1}>
        <Typography variant="h6" sx={{fontFamily: 'Montserrat, sans-serif', textAlign: "left", fontWeight:"400"}}>Cover Image</Typography>
        {image && (
            <Grid item xs={12}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 200,
                  marginBottom: '20px',
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                  src={image}
                  alt="uploaded preview"
                />
                <IconButton
                  color="secondary"
                  aria-label="delete image"
                  onClick={handleDeleteImage}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Grid>
          )}
            <Grid item xs={12} sm={12} md={12}>
                <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "90%" }}>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="upload-image"
                    multiple
                    type="file"
                    onChange={handleImageChange}
                />
                <label htmlFor="upload-image">
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <AddAPhoto />
                </IconButton>
                </label>
                </FormControl>
                
            </Grid>
        </Grid>
        <Grid container sx={{border: "1px solid #eee", borderRadius: "10px", marginTop: "4%", padding: "2%"}} spacing={1}>
            <Grid item xs={12} sm={12} md={12}>
            <Typography variant="h6" sx={{fontFamily: 'Montserrat, sans-serif', textAlign: "left", fontWeight:"400"}}>Post Description</Typography>
                <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "100%" }}>
                    <Input
                    aria-describedby="description"
                    required
                    inputProps={{
                        'aria-label': 'description',
                    }}
                    fullWidth
                    name="description"
                    multiline
                    rows={4}
                    value={template.description}
                    onChange={handleChange}
                    type="text"
                    />
                    <FormHelperText id="description">Description</FormHelperText>
                </FormControl>
            </Grid>
        </Grid>
        <Grid container sx={{ marginTop: "4%"}} spacing={1}>
            <Grid item xs={12} sm={12} md={12} sx={{margin: "auto"}}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                {isEditMode ? 'Update Post' : 'Create Post'}
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

export default BlogForm;
