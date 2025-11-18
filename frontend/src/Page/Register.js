import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import API_URL from "../api";
const sidebarCollapsedWidth = 50;
const sidebarExpandedWidth = 150;

const Register = () => {
  const [formData, setFormData] = useState({
    teamNo: "",
    name: "",
    department: "",
    email: "",
    description: "",
    image: null,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("teamNo", formData.teamNo);
      data.append("name", formData.name);
      data.append("department", formData.department);
      data.append("email", formData.email);
      data.append("description", formData.description);

      if (formData.image) {
        data.append("image", formData.image);
      } else {
        data.append("image", "https://example.com/default.jpg");
      }

      const res = await axios.post(`${API_URL}/addParticipants`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Participant added:", res.data);
      alert("🎉 Registration Successful!");
      setFormData({ teamNo: "", name: "", department: "", email: "", description: "", image: null });
    } catch (error) {
      console.error("❌ Error registering participant:", error);
      alert("Something went wrong! Check console for details.");
    }
  };

  const sidebarItems = [
    { text: "Register", icon: <PersonAddIcon />, link: "/register" },
    { text: "Winners", icon: <EmojiEventsIcon />, link: "/winners" },
    { text: "Signup", icon: <AppRegistrationIcon />, link: "/signup" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* Collapsible Sidebar */}
      <Drawer
        variant="permanent"
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
        sx={{
          width: sidebarOpen ? sidebarExpandedWidth : sidebarCollapsedWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: sidebarOpen ? sidebarExpandedWidth : sidebarCollapsedWidth,
            bgcolor: "rgba(255,255,255,0.1)",
            color: "#000",
            backdropFilter: "blur(10px)",
            overflowX: "hidden",
            borderRight: "1px solid rgba(0,0,0,0.1)",
            transition: "width 0.3s",
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 3, mb: 2 }}>
          <HomeIcon fontSize="large" />
          {sidebarOpen && (
            <Typography variant="h6" mt={1} fontWeight="bold">
              Admin Panel
            </Typography>
          )}
        </Box>
        <List>
          {sidebarItems.map((item) => (
            <Tooltip key={item.text} title={!sidebarOpen ? item.text : ""} placement="right">
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  component={Link}
                  to={item.link}
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    transition: "0.3s",
                    color: "#000",
                    "&:hover": {
                      bgcolor: "rgba(0,0,0,0.05)",
                      transform: "scale(1.05)",
                      color: "#1976d2",
                    },
                  }}
                >
                  {item.icon}
                  {sidebarOpen && <ListItemText primary={item.text} sx={{ ml: 2 }} />}
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Container
        sx={{
          py: 6,
          ml: sidebarCollapsedWidth,
          width: `calc(100% - ${sidebarCollapsedWidth}px)`,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          gutterBottom
          sx={{ mb: 4 }}
        >
          📝 Register for the Event
        </Typography>

        <Paper elevation={4} sx={{ p: 4, maxWidth: 600, mx: "auto", borderRadius: 3 }}>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Grid container spacing={3}>
              {/* Team Number */}
              <Grid item xs={12}>
                <TextField
                  name="teamNo"
                  label="Team Number"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.teamNo}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Team Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="department"
                  label="Project Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.department}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Project Description / Participation Details"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  required
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<UploadFileIcon />}
                  fullWidth
                >
                  Project Image (Optional)
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    name="image"
                    onChange={handleChange}
                  />
                </Button>
                {formData.image && (
                  <Box mt={2} display="flex" justifyContent="center">
                    <Avatar
                      src={URL.createObjectURL(formData.image)}
                      alt="preview"
                      sx={{ width: 100, height: 100 }}
                    />
                  </Box>
                )}
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ py: 1.5, borderRadius: 2 }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
