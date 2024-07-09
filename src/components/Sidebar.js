import React from 'react';
import { NavLink } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, ListItemButton, ListSubheader, Box, Typography, Collapse } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import EventIcon from '@mui/icons-material/Event';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import EmailIcon from '@mui/icons-material/Email';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FeedIcon from '@mui/icons-material/Feed';
import AppsIcon from '@mui/icons-material/Apps';
import Logout from './Logout';

function Sidebar({ onLogout }) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className="sidebar">
      
      <List sx={{marginTop: "8%"}}>
        <ListItem button component={NavLink} to="/">
          <ListItemIcon sx={{minWidth: "32px"}}><HomeIcon /></ListItemIcon>
          <ListItemText className="sidebarText" primary="Dashboard" style={{ fontFamily: 'Montserrat, sans-serif' }} />
        </ListItem>
        <ListItem button component={NavLink} to="/events">
          <ListItemIcon sx={{minWidth: "32px"}}><EventIcon /></ListItemIcon>
          <ListItemText className="sidebarText" primary="Manage Parties" style={{ fontFamily: 'Montserrat, sans-serif' }} />
        </ListItem>
        <ListItem button component={NavLink} to="/tickets">
          <ListItemIcon sx={{minWidth: "32px"}}><ConfirmationNumberIcon /></ListItemIcon>
          <ListItemText className="sidebarText" primary="View Tickets" style={{ fontFamily: 'Montserrat, sans-serif' }} />
        </ListItem>
        <ListItem button component={NavLink} to="/promo">
          <ListItemIcon sx={{minWidth: "32px"}}><LocalActivityIcon /></ListItemIcon>
          <ListItemText className="sidebarText" primary="PromoCodes" style={{ fontFamily: 'Montserrat, sans-serif' }} />
        </ListItem>
        <ListItem button component={NavLink} to="/users">
          <ListItemIcon sx={{minWidth: "32px"}}><PeopleIcon /></ListItemIcon>
          <ListItemText className="sidebarText" primary="Manage Users" style={{ fontFamily: 'Montserrat, sans-serif' }} />
        </ListItem>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon  sx={{minWidth: "32px"}}>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText className="sidebarText" primary="Notifications" sx={{color: "#FFF"}} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <ListItem component={NavLink} disablePadding to="/email-templates" >
            <ListItemButton sx={{ pl: 4, color: "#FFF" }}>
              <ListItemIcon  sx={{minWidth: "32px"}}>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText className="sidebarText" primary="Email Notifications" />
            </ListItemButton>
          </ListItem>
          <ListItem component={NavLink} disablePadding to="/app-notifications">
            <ListItemButton sx={{ pl: 4, color: "#FFF" }}>
              <ListItemIcon  sx={{minWidth: "32px"}}>
                <AppsIcon />
              </ListItemIcon>
              <ListItemText className="sidebarText" primary="Application Notifications" />
            </ListItemButton>
          </ListItem>
        </Collapse>
        <ListItem button component={NavLink} to="/blogs">
          <ListItemIcon sx={{minWidth: "32px"}}><FeedIcon /></ListItemIcon>
          <ListItemText className="sidebarText" primary="Manage Blogs" style={{ fontFamily: 'Montserrat, sans-serif' }} />
        </ListItem>
        <ListItem button component={NavLink} to="/settings">
          <ListItemIcon sx={{minWidth: "32px"}}><SettingsIcon /></ListItemIcon>
          <ListItemText className="sidebarText" primary="Settings" style={{ fontFamily: 'Montserrat, sans-serif' }} />
        </ListItem>
        <ListItem>
          <ListItemIcon sx={{minWidth: "32px"}}><PowerSettingsNewIcon /></ListItemIcon>
          <Logout onLogout={onLogout} /> {/* Render Logout component */}
        </ListItem>
      </List>
    </div>
  );
}

export default Sidebar;
