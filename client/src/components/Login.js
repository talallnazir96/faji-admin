// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import constant from "../constant";
const Login = ({ setAuthToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    try {
      const response = await axios.post(`${constant.apiUrl}/auth/login`, {
        username,
        password,
      });
      console.log(response);
      if (response.status === 201) {
        const userRole = response.data.userRole;
        console.log(userRole);
        localStorage.setItem("userId", response.data.userId);
        const token = 'fake-auth-token'; // Replace with real token from server
        localStorage.setItem('authToken', token);
        setAuthToken(token);
        if (userRole === "admin") {
          // setSnackbarMessage("Login successful!");
          // setSnackbarSeverity("success");
          // setSnackbarOpen(true);
          navigate("/");
        }
      }
    } catch (error) {
      setSnackbarMessage("Invalid credentials");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Box className="loginForm" sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          id="username"
          label="Username"
          margin="normal"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
          fullWidth
          id="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          margin="normal"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Login
        </Button>
      </form>
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
    </Box>
  );
};

export default Login;
