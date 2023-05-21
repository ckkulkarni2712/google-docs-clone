import React from "react";
import MailIcon from "@mui/icons-material/Mail";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ContactsIcon from "@mui/icons-material/Contacts";
import { Box } from "@mui/material";
import "./style.css";
const Sidebar = () => {
  return (
    <Box>
      <div className="sidebar">
        <a href="https://mail.google.com/" className="sidebar-item">
          <MailIcon />
        </a>
        <a href="https://drive.google.com/" className="sidebar-item">
          <AddToDriveIcon />
        </a>
        <a href="https://calendar.google.com/" className="sidebar-item">
          <CalendarMonthIcon />
        </a>
        <a href="https://www.google.com/maps/" className="sidebar-item">
          <LocationOnIcon />
        </a>
        <a href="https://contacts.google.com/" className="sidebar-item">
          <ContactsIcon />
        </a>
      </div>
    </Box>
  );
};

export default Sidebar;
