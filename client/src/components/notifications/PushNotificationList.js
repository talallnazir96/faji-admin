import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Grid,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  AddCircle as AddCircleIcon,
  Description,
} from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import constant from "../../constant";
import axios from "axios";
const emailTemplates = [
  {
    id: 1,
    title: "Important Announcment",
    created_at: "20-06-2024",
    type: "Announcement",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet accumsan enim. Aliquam erat volutpat. Proin eu eros in lacus iaculis fringilla. Maecenas non consequat tortor. Aliquam varius in dui nec malesuada. Nulla sed sapien id mi malesuada eleifend. Morbi felis ligula, venenatis ac turpis quis, sodales vehicula massa. Ut tincidunt magna quis erat tempus, ac gravida magna blandit. Nulla facilisi. Vivamus id condimentum libero, ut elementum purus.",
  },
  {
    id: 2,
    title: "Important Announcment",
    created_at: "20-06-2024",
    type: "Upcoming Events",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet accumsan enim. Aliquam erat volutpat. Proin eu eros in lacus iaculis fringilla. Maecenas non consequat tortor. Aliquam varius in dui nec malesuada. Nulla sed sapien id mi malesuada eleifend. Morbi felis ligula, venenatis ac turpis quis, sodales vehicula massa. Ut tincidunt magna quis erat tempus, ac gravida magna blandit. Nulla facilisi. Vivamus id condimentum libero, ut elementum purus.",
  },
  // Add more templates as needed
];
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const PushNotificationList = () => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notificationIdToDelete, setNotificationIdToDelete] = useState(null);
  useEffect(() => {
    const getAllNotifications = async () => {
      try {
        const notifications = await axios.get(
          `${constant.apiUrl}/app-notifications/`
        );
        // console.log(blogs);
        setNotifications(notifications.data);
      } catch (error) {
        setError("Error fetching notifications");
      } finally {
        setLoading(false);
      }
    };

    getAllNotifications();
  }, []);
  console.log(notifications);
  const handleEdit = (id) => {
    navigate(`/app-notifications/edit/${id}`);
  };

  const handleSend = (id) => {
    setSnackbarMessage("Notification sent Successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleDelete = (id) => {
    setNotificationIdToDelete(id);
    setDialogOpen(true);

    // Implement delete functionality here
    console.log("Delete template with ID:", id);
  };

  const handleCreate = () => {
    navigate("/app-notifications/create");
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleDialogConfirm = async (id) => {
    if (!notificationIdToDelete) return null;
    try {
      const response = await fetch(
        `${constant.apiUrl}/app-notifications/${notificationIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("Notification successfully deleted");

        setNotifications((prevPosts) => {
          const updatedNotifications = prevPosts.filter(
            (notification) => notification._id !== notificationIdToDelete
          );
          console.log("Updated notifications:", updatedNotifications); // Log the updated state
          return updatedNotifications;
        });
      } else {
        console.error(`Failed to delete notiofication: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setDialogOpen(false); // Close the dialog after handling
      setNotificationIdToDelete(null);
      setSnackbarMessage("Notification Deleted Successfully!");
      setSnackbarSeverity("success");
      setDialogOpen(false);
      setSnackbarOpen(true);
    }

  
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <>
      <Grid container sx={{ marginTop: "8%", marginBottom: "2%" }}>
        <Grid item xs={8} sm={8} md={10}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Montserrat, sans-serif",
              textAlign: "left",
              fontWeight: "500",
            }}
          >
            Manage Application Notifications
          </Typography>
        </Grid>
        <Grid item xs={4} sm={4} md={2} align="right">
          <Button
            onClick={handleCreate}
            variant="outlined"
            color="customColor"
            startIcon={<AddCircleIcon />}
          >
            Add New
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          sx={{ marginTop: "4%", marginBottom: "2%" }}
        >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Notification Title</TableCell>
                  <TableCell>Created Date</TableCell>
                  <TableCell>Notification Description</TableCell>
                  <TableCell>Notification Type</TableCell>
                  {/* <TableCell>Send Email</TableCell> */}
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notifications.map((notification) => (
                  <TableRow key={notification.notification_id}>
                    <TableCell>{notification.title}</TableCell>
                    <TableCell>{notification.date}</TableCell>
                    <TableCell>{notification.description}</TableCell>
                    <TableCell>{notification.type}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleSend(notification.id)}
                        sx={{ fontSize: 24, color: "#FF4343" }}
                      >
                        <SendIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleEdit(notification.notification_id)}
                        sx={{ fontSize: 16, color: "#a370f7" }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(notification._id)}
                        sx={{ fontSize: 16, color: "#dc3545" }}
                      >
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
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ textAlign: "center" }}>Are you Sure ?</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{ textAlign: "center" }}
          >
            Are you sure you want to delete this notification?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogConfirm}>Delete</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PushNotificationList;
