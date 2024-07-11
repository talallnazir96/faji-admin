import React from 'react';
import { NavLink } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, ListItemButton, Collapse } from '@mui/material';
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
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FeedIcon from '@mui/icons-material/Feed';
import AppsIcon from '@mui/icons-material/Apps';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ReportIcon from '@mui/icons-material/Report';
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
        <ListItem button component={NavLink} to="/finance">
          <ListItemIcon sx={{minWidth: "32px"}}><AccountBalanceIcon /></ListItemIcon>
          <ListItemText className="sidebarText" primary="Financial Overview" style={{ fontFamily: 'Montserrat, sans-serif' }} />
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
        <ListItem button component={NavLink} to="/audit">
          <ListItemIcon sx={{minWidth: "32px"}}><AssessmentIcon /></ListItemIcon>
          <ListItemText className="sidebarText" primary="Audit Logs" style={{ fontFamily: 'Montserrat, sans-serif' }} />
        </ListItem>
        <ListItem button component={NavLink} to="/reports">
          <ListItemIcon sx={{minWidth: "32px"}}><ReportIcon /></ListItemIcon>
          <ListItemText className="sidebarText" primary="Escalations & Reports" style={{ fontFamily: 'Montserrat, sans-serif' }} />
        </ListItem>
        <ListItem>
          <ListItemIcon sx={{minWidth: "32px"}}><PowerSettingsNewIcon /></ListItemIcon>
          <Logout onLogout={onLogout} /> {/* Render Logout component */}
        </ListItem><br/>
      </List>
    </div>
  );
}

export default Sidebar;
