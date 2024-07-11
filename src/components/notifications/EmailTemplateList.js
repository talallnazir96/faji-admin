import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Grid
    , Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Snackbar, Alert
 } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, AddCircle as AddCircleIcon } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';

const emailTemplates = [
  { id: 1, name: 'Welcome Email', subject: 'Welcome to Our Service', body: 'Hello, welcome to our service!' },
  { id: 2, name: 'Reset Password', subject: 'Reset Your Password', body: 'Click here to reset your password.' },
  // Add more templates as needed
];
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const EmailTemplateList = () => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');
const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleEdit = (id) => {
    navigate(`/email-templates/edit/${id}`);
  };

  const handleDelete = (id) => {
    setDialogOpen(true);

    // Implement delete functionality here
    console.log('Delete template with ID:', id);
  };

  const handleCreate = () => {
    navigate('/email-templates/create');
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
};
const handleDialogConfirm = () => {
    setSnackbarMessage('Template Deleted Successfully!');
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
        <Grid item xs={8} sm={8} md={10}>
            <Typography variant="h4" sx={{fontFamily: 'Montserrat, sans-serif', textAlign: "left", fontWeight: "500"}}>Email Templates</Typography>
        </Grid>
        <Grid item xs={4} sm={4} md={2} align="right">
          <Button  onClick={handleCreate} variant="outlined" color='customColor' startIcon={<AddCircleIcon />}>Add New</Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12} sx={{marginTop: "4%", marginBottom: "2%"}}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Subject</TableCell>
                        {/* <TableCell>Send Email</TableCell> */}
                        <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {emailTemplates.map((template) => (
                        <TableRow key={template.id}>
                            <TableCell>{template.name}</TableCell>
                            <TableCell>{template.subject}</TableCell>
                            {/* <TableCell>
                                <SendIcon onClick={() => handleEdit(template.id)} sx={{fontSize: 24, color: "#FF4343"}}>
                                    <EditIcon />
                                </SendIcon>
                            </TableCell> */}
                            <TableCell>
                            <IconButton onClick={() => handleEdit(template.id)} sx={{fontSize: 16, color: "#a370f7"}}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(template.id)} sx={{fontSize: 16, color: "#dc3545"}}>
                                <DeleteIcon />
                            </IconButton>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    </Grid>
    <Dialog open={dialogOpen} onClose={handleDialogClose} TransitionComponent={Transition} keepMounted aria-describedby="alert-dialog-slide-description">
            <DialogTitle sx={{textAlign: "center"}}>Are you Sure ?</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description"  sx={{textAlign: "center"}}>
                Are you sure you want to delete this template?
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
};

export default EmailTemplateList;
