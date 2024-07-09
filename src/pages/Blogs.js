import React, {useState} from "react";
import { Grid, Typography, Button, Card, CardActions, CardContent, CardMedia, Snackbar, Alert,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide,
 }  from '@mui/material';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import Image from "../assets/event.jpg"
import { useNavigate } from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const Blogs = () => {
    const navigate = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const handleCreate = () => {
        navigate('/blogs/blog-form/create');
    };
    const handleEdit = (id) => {
        navigate(`/blogs/blog-form/edit/${id}`);
    };
    const handleDelete = (id) => {
        setDialogOpen(true);
        // Implement delete functionality here
        console.log('Delete template with ID:', id);
      };
    
      const handleDialogClose = () => {
        setDialogOpen(false);
    };
    const handleDialogConfirm = () => {
        setSnackbarMessage('Post Deleted Successfully!');
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
            <Grid container spacing={1} sx={{marginTop: "8%", marginBottom: "4%"}} >
                <Grid item xs={8} sm={8} md={8}>
                    <Typography variant="h4" sx={{fontFamily: 'Montserrat, sans-serif', textAlign: "left", fontWeight: "500"}}>Manage Blogs</Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} align="right">
                    <Button variant="outlined" color='customColor' onClick={handleCreate}  startIcon={<AddCircleIcon />}>Add New</Button>
                </Grid>
                <Grid item xs={2} sm={2} md={2} align="right">
                    <Button variant="outlined" color='customColor' startIcon={<HourglassEmptyIcon />}>LoadMore</Button>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={4} md={4}>
                    <Card sx={{ maxWidth: "100%" }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image={Image}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            Party C
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                             In fermentum semper mauris non sodales. Integer consectetur, 
                             elit ac pulvinar laoreet, arcu urna hendrerit diam, sit amet 
                             cursus nibh sem et lorem. Nunc elementum mauris ut blandit mattis.
                            </Typography>
                        </CardContent>
                        <CardActions>
                        <Button size="small" onClick={() => handleDelete(1)} variant="outlined" color='customColor'><DeleteIcon  sx={{fontSize: "14px", marginRight: "10px"}}/> Delete</Button>
                        <Button size="small" onClick={() => handleEdit(1)} variant="outlined" color='customColor'><EditIcon  sx={{fontSize: "14px", marginRight: "10px"}}/> Edit</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Card sx={{ maxWidth: "100%" }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image={Image}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            Party A
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                             In fermentum semper mauris non sodales. Integer consectetur, 
                             elit ac pulvinar laoreet, arcu urna hendrerit diam, sit amet 
                             cursus nibh sem et lorem. Nunc elementum mauris ut blandit mattis.
                            </Typography>
                        </CardContent>
                        <CardActions>
                        <Button size="small" onClick={() => handleDelete(1)} variant="outlined" color='customColor'><DeleteIcon  sx={{fontSize: "14px", marginRight: "10px"}}/> Delete</Button>
                            <Button size="small" onClick={() => handleEdit(1)} variant="outlined" color='customColor'><EditIcon  sx={{fontSize: "14px", marginRight: "10px"}}/> Edit</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Card sx={{ maxWidth: "100%" }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image={Image}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            Party B
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                             In fermentum semper mauris non sodales. Integer consectetur, 
                             elit ac pulvinar laoreet, arcu urna hendrerit diam, sit amet 
                             cursus nibh sem et lorem. Nunc elementum mauris ut blandit mattis.
                            </Typography>
                        </CardContent>
                        <CardActions>
                        <Button size="small" onClick={() => handleDelete(1)} variant="outlined" color='customColor'><DeleteIcon  sx={{fontSize: "14px", marginRight: "10px"}}/> Delete</Button>
                            <Button size="small" onClick={() => handleEdit(1)} variant="outlined" color='customColor'><EditIcon  sx={{fontSize: "14px", marginRight: "10px"}}/> Edit</Button>
                        </CardActions>
                    </Card>
                </Grid>
                
            </Grid>
            <Dialog open={dialogOpen} onClose={handleDialogClose} TransitionComponent={Transition} keepMounted aria-describedby="alert-dialog-slide-description">
            <DialogTitle sx={{textAlign: "center"}}>Are you Sure ?</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description"  sx={{textAlign: "center"}}>
                Are you sure you want to delete this post?
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
    )
}
export default Blogs;