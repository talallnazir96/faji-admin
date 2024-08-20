import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  TextField,
  Box,
  Typography,
  Input,
  FormControl,
  FormHelperText,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import constant from "../../constant";
import { useNavigate } from "react-router-dom";

const initialTemplates = [
  {
    id: 1,
    title: "Important Announcment",
    date: "2023-07-06",
    type: "announcement",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet accumsan enim. Aliquam erat volutpat. Proin eu eros in lacus iaculis fringilla. Maecenas non consequat tortor. Aliquam varius in dui nec malesuada. Nulla sed sapien id mi malesuada eleifend. Morbi felis ligula, venenatis ac turpis quis, sodales vehicula massa. Ut tincidunt magna quis erat tempus, ac gravida magna blandit. Nulla facilisi. Vivamus id condimentum libero, ut elementum purus.",
  },
  {
    id: 2,
    title: "Important Announcment",
    date: "2023-07-06",
    type: "upcoming_events",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet accumsan enim. Aliquam erat volutpat. Proin eu eros in lacus iaculis fringilla. Maecenas non consequat tortor. Aliquam varius in dui nec malesuada. Nulla sed sapien id mi malesuada eleifend. Morbi felis ligula, venenatis ac turpis quis, sodales vehicula massa. Ut tincidunt magna quis erat tempus, ac gravida magna blandit. Nulla facilisi. Vivamus id condimentum libero, ut elementum purus.",
  },
  // Add more templates as needed
];
const type = [
  {
    value: "announcement",
    label: "Anouncement",
  },
  {
    value: "upcoming_events",
    label: "Upcoming Events",
  },
  {
    value: "special_offer",
    label: "Special Offer",
  },
];
const NotificationForm = () => {
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [template, setTemplate] = useState({
    title: "",
    date: "",
    type: "",
    description: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  useEffect(() => {
    axios
      .get(`${constant.apiUrl}/app-notifications/${id}`)
      .then((response) => {
        const data = response.data;
        data.date = formatDate(data.date);
        setTemplate(data);
      })
      .catch((error) => {
        console.error("Error fetching email template data:", error);
      });
  }, [id]);
  console.log(template);
  useEffect(() => {
    if (id) {
      console.log(`Edit mode activated for ID: ${id}`); // Debug log
      const existingTemplate = initialTemplates.find(
        (t) => t.id === parseInt(id, 10)
      );
      if (existingTemplate) {
        setTemplate(existingTemplate);
        setIsEditMode(true);
      } else {
        console.error("Template not found for ID:", id); // Debug log
      }
    } else {
      console.log("Create mode activated"); // Debug log
      setIsEditMode(false);
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = isEditMode
        ? `${constant.apiUrl}/app-notifications/${template._id}` // Correct URL format with ID
        : `${constant.apiUrl}/app-notifications/`;

      const response = isEditMode
        ? await axios.put(url, template, {
            headers: { "Content-Type": "application/json" },
          })
        : await axios.post(url, template, {
            headers: { "Content-Type": "application/json" },
          });

      console.log("Notification Template operation successful:", response.data);
      setSnackbarOpen(true);
      setSnackbarMessage(
        isEditMode
          ? "Notification Template updated successfully!"
          : "Notification Template created successfully!"
      );
      setSnackbarSeverity("success");
      navigate("/app-notifications");
    } catch (error) {
      console.error(
        "Error creating/updating notification template:",
        error.response ? error.response.data : error.message
      );
      setSnackbarOpen(true);
      setSnackbarMessage("Error creating/updating notification template!");
      setSnackbarSeverity("error");
    }
  };
  console.log(template);
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        margin: "8% auto 2%",
        width: "80%",
      }}
    >
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                textAlign: "left",
                fontWeight: "500",
              }}
            >
              {isEditMode ? "Update Notification" : "Create Notification"}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "100%" }}>
              <Input
                aria-describedby="title"
                required
                inputProps={{
                  "aria-label": "title",
                }}
                fullWidth
                name="title"
                value={template.title}
                onChange={handleChange}
                type="text"
              />
              <FormHelperText id="title">Notification Title</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "100%" }}>
              <Input
                aria-describedby="created_at"
                required
                inputProps={{
                  "aria-label": "created_at",
                }}
                fullWidth
                name="date"
                value={template.date}
                onChange={handleChange}
                type="date"
              />
              <FormHelperText id="created_at">Set Date</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "100%" }}>
              <TextField
                id="type"
                select
                SelectProps={{
                  native: true,
                }}
                helpertext="Notification type"
                variant="standard"
                fullWidth
                name="type"
                value={template.type}
                onChange={handleChange}
              >
                {type.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "100%" }}>
              <Input
                aria-describedby="description"
                required
                inputProps={{
                  "aria-label": "description",
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
          <Grid item xs={12} sm={12} md={12} sx={{ margin: "auto" }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {isEditMode ? "Update Template" : "Create Template"}
            </Button>
          </Grid>
        </Grid>
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
      </div>
    </Box>
  );
};

export default NotificationForm;
