import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Users from './pages/Users';
import Events from './pages/Events';
import Settings from './pages/Settings';
import './App.css';
import Tickets from './pages/Tickets';
import Notifications from './pages/Notifications';
import Login from './components/Login';
import BackgroundUpdater from './components/BodyBackground';
import CssBaseline from '@mui/material/CssBaseline';
import { Grid, ThemeProvider, createTheme } from '@mui/material';
import ViewEvent from './components/events/ViewEvent';
import UpdateEvent from './components/events/UpdateEvent';
import ViewTicket from './components/tickets/ViewTicket';
import PromoCode from './pages/PromoCodes';
import EditPromo from './components/tickets/EditPromo';
import EditUser from './components/users/EditUser';
import AddPromo from './components/tickets/AddPromo';
import AddUser from './components/users/AddUser';
import EmailTemplateList from './components/notifications/EmailTemplateList';
import EmailTemplateForm from './components/notifications/EmailTemplateForm';
import PushNotificationList from './components/notifications/PushNotificationList';
import NotificationForm from './components/notifications/AddNotification';
import Blogs from './pages/Blogs';
import BlogForm from './components/blogs/BlogForm';
import Finance from './pages/Finance';
import Audit from './pages/Audit';
import Reports from './pages/Reports';
import { Paper } from '@mui/material';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedIn, setAuthToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);

  };

  const theme = createTheme({
    palette: {
      customColor: {
        main: '#FD99C9',
      },
    },
  });
  return (
    <>
    <Router>
    <ThemeProvider theme={theme}>
      <div className="App">
      {isLoggedIn && (
          <>
            <CssBaseline />
            <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout}  />
          </>
        )}
          <Grid container spacing={2}>
            {isLoggedIn && (
              <>
                <Grid item  xs={12} sm={3} md={3} >
                 <Sidebar  onLogout={handleLogout} />
                </Grid>
                <Grid item  xs={12} sm={9} md={9}>
                  <div className="main-content">
                    <BackgroundUpdater /> 
                    <Routes>
                      <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
                      <Route path="/login" element={<Login  setAuthToken={setAuthToken}  />} />
                      <Route path="/users" element={isLoggedIn ? <Users /> : <Navigate to="/login" />} />
                      <Route path="/events" element={isLoggedIn ? <Events /> : <Navigate to="/login" />} />
                      <Route path="/tickets" element={isLoggedIn ? <Tickets /> : <Navigate to="/login" />} />
                      <Route path="/notifications" element={isLoggedIn ? <Notifications /> : <Navigate to="/login" />} />
                      <Route path="/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/login" />} />
                      <Route path="/events/view-event/:id" element={isLoggedIn ? <ViewEvent /> : <Navigate to="/login" />} />
                      <Route path="/events/update-event/:id" element={isLoggedIn ? <UpdateEvent /> : <Navigate to="/login" />} />
                      <Route path="/promo" element={isLoggedIn ? <PromoCode /> : <Navigate to="/login" />} />
                      <Route path="/promo/edit-promo/:id" element={isLoggedIn ? <EditPromo /> : <Navigate to="/login" />} />
                      <Route path="/users/edit-user/:id" element={isLoggedIn ? <EditUser /> : <Navigate to="/login" />} />
                      <Route path="/promo/add-promo/" element={isLoggedIn ? <AddPromo /> : <Navigate to="/login" />} />
                      <Route path="/users/add-user/" element={isLoggedIn ? <AddUser /> : <Navigate to="/login" />} />
                      <Route path="/tickets/view-ticket/:id" element={isLoggedIn ? <ViewTicket /> : <Navigate to="/login" />} />
                      <Route path="/email-templates" element={isLoggedIn ? <EmailTemplateList /> : <Navigate to="/login" />} />
                      <Route path="/email-templates/create" element={isLoggedIn ? <EmailTemplateForm /> : <Navigate to="/login" />} />
                      <Route path="/email-templates/edit/:id" element={isLoggedIn ? <EmailTemplateForm /> : <Navigate to="/login" />} />
                      <Route path="/app-notifications" element={isLoggedIn ? <PushNotificationList /> : <Navigate to="/login" />} />
                      <Route path="/app-notifications/create" element={isLoggedIn ? <NotificationForm /> : <Navigate to="/login" />} />
                      <Route path="/app-notifications/edit/:id" element={isLoggedIn ? <NotificationForm /> : <Navigate to="/login" />} />
                      <Route path="/blogs" element={isLoggedIn ? <Blogs /> : <Navigate to="/login" />} />
                      <Route path="/blogs/blog-form/create" element={isLoggedIn ? <BlogForm /> : <Navigate to="/login" />} />
                      <Route path="/blogs/blog-form/edit/:id" element={isLoggedIn ? <BlogForm /> : <Navigate to="/login" />} />
                      <Route path="/finance" element={isLoggedIn ? <Finance /> : <Navigate to="/login" />} />
                      <Route path="/audit" element={isLoggedIn ? <Audit /> : <Navigate to="/login" />} />
                      <Route path="/reports" element={isLoggedIn ? <Reports /> : <Navigate to="/login" />} />
                    </Routes>
                  </div>
                </Grid>
              </>             
            )}
            {!isLoggedIn && (
              <Grid item xs={12} sm={12} md={12}>
                <div className="main-content">
                  <BackgroundUpdater /> 
                  <Routes>
                    <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
                    <Route path="/login" element={<Login  setAuthToken={setAuthToken}  />} />
                    <Route path="/users" element={isLoggedIn ? <Users /> : <Navigate to="/login" />} />
                    <Route path="/events" element={isLoggedIn ? <Events /> : <Navigate to="/login" />} />
                    <Route path="/tickets" element={isLoggedIn ? <Tickets /> : <Navigate to="/login" />} />
                    <Route path="/notifications" element={isLoggedIn ? <Notifications /> : <Navigate to="/login" />} />
                    <Route path="/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/login" />} />
                    <Route path="/events/update-event/:id" element={isLoggedIn ? <UpdateEvent /> : <Navigate to="/login" />} />
                    <Route path="/events/view-event/:id" element={isLoggedIn ? <ViewEvent /> : <Navigate to="/login" />} />
                    <Route path="/promo" element={isLoggedIn ? <PromoCode /> : <Navigate to="/login" />} />
                    <Route path="/promo/edit-promo/:id" element={isLoggedIn ? <EditPromo /> : <Navigate to="/login" />} />
                    <Route path="/promo/add-promo/" element={isLoggedIn ? <AddPromo /> : <Navigate to="/login" />} />
                    <Route path="/users/add-user/" element={isLoggedIn ? <AddUser /> : <Navigate to="/login" />} />
                    <Route path="/tickets/view-ticket/:id" element={isLoggedIn ? <ViewTicket /> : <Navigate to="/login" />} />
                    <Route path="/email-templates" element={isLoggedIn ? <EmailTemplateList /> : <Navigate to="/login" />} />
                    <Route path="/email-templates/create" element={isLoggedIn ? <EmailTemplateForm /> : <Navigate to="/login" />} />
                    <Route path="/users/edit-user/:id" element={isLoggedIn ? <EditUser /> : <Navigate to="/login" />} />
                    <Route path="/email-templates/edit/:id" element={isLoggedIn ? <EmailTemplateForm /> : <Navigate to="/login" />} />
                    <Route path="/app-notifications" element={isLoggedIn ? <PushNotificationList /> : <Navigate to="/login" />} />
                    <Route path="/app-notifications/create" element={isLoggedIn ? <NotificationForm /> : <Navigate to="/login" />} />
                    <Route path="/app-notifications/edit/:id" element={isLoggedIn ? <NotificationForm /> : <Navigate to="/login" />} />
                    <Route path="/blogs" element={isLoggedIn ? <Blogs /> : <Navigate to="/login" />} />
                    <Route path="/blogs/blog-form/create" element={isLoggedIn ? <BlogForm /> : <Navigate to="/login" />} />
                    <Route path="/finance" element={isLoggedIn ? <Finance /> : <Navigate to="/login" />} />
                    <Route path="/blogs/blog-form/edit/:id" element={isLoggedIn ? <BlogForm /> : <Navigate to="/login" />} />
                    <Route path="/audit" element={isLoggedIn ? <Audit /> : <Navigate to="/login" />} />
                    <Route path="/reports" element={isLoggedIn ? <Reports /> : <Navigate to="/login" />} />
                  </Routes>
                </div>
              </Grid>
            )}
          </Grid>
      </div>
      </ThemeProvider>
    </Router>
    </>
    
  );
}

export default App;
