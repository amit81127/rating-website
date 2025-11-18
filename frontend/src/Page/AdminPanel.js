import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Avatar,
  Box,
  IconButton,
  TextField,
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import API_URL from "../api";

const sidebarCollapsedWidth = 60;
const sidebarExpandedWidth = 180;

const AdminPanel = () => {
  
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch participants
  const fetchParticipants = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/allParticipants`);
      setParticipants(data);
    } catch (err) {
      console.error("Error fetching participants:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  // Delete participant
  const handleDelete = async (participantId) => {
    try {
      await axios.delete(`${API_URL}/deleteParticipant/${participantId}`);
      setParticipants((prev) => prev.filter((p) => p._id !== participantId));
      setDeleteDialog({ open: false, id: null });
    } catch (err) {
      console.error("Error deleting participant:", err);
      alert("Failed to delete participant.");
    }
  };

  // Filter participants
  const filteredParticipants = participants.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.department.toLowerCase().includes(search.toLowerCase()) ||
      (p.teamNo && p.teamNo.toString().includes(search))
  );

  const sidebarItems = [
    { text: "Register", icon: <PersonAddIcon />, link: "/register" },
    { text: "Winners", icon: <EmojiEventsIcon />, link: "/winners" },
    { text: "Signup", icon: <AppRegistrationIcon />, link: "/signup" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
        sx={{
          width: sidebarOpen ? sidebarExpandedWidth : sidebarCollapsedWidth,
          flexShrink: 0,
          transition: "width 0.3s",
          [`& .MuiDrawer-paper`]: {
            width: sidebarOpen ? sidebarExpandedWidth : sidebarCollapsedWidth,
            transition: "width 0.3s",
            bgcolor: "#ffffffdd",
            color: "#000",
            backdropFilter: "blur(10px)",
            overflowX: "hidden",
            borderRight: "1px solid rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 3,
            mb: 2,
          }}
        >
          <HomeIcon fontSize="large" />
          {sidebarOpen && (
            <Typography variant="h6" mt={1} fontWeight="bold">
              Admin Panel
            </Typography>
          )}
        </Box>
        <List>
          {sidebarItems.map((item) => (
            <Tooltip
              key={item.text}
              title={!sidebarOpen ? item.text : ""}
              placement="right"
            >
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
          py: 4,
          ml: sidebarOpen ? sidebarExpandedWidth : sidebarCollapsedWidth,
          width: `calc(100% - ${sidebarOpen ? sidebarExpandedWidth : sidebarCollapsedWidth}px)`,
          transition: "margin-left 0.3s, width 0.3s",
        }}
      >
        {/* Search Box */}
        <Box mb={4} textAlign="center">
          <TextField
            variant="outlined"
            placeholder="Search participants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              width: "100%",
              maxWidth: 400,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                bgcolor: "rgba(0,0,0,0.05)",
                "&:hover": { bgcolor: "rgba(0,0,0,0.1)" },
              },
            }}
          />
        </Box>

        {/* Participants */}
        {loading ? (
          <Box textAlign="center" mt={10}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {filteredParticipants.map((participant, index) => (
              <Grid item xs={12} sm={6} md={4} key={participant._id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      p: 3,
                      borderRadius: 3,
                      boxShadow: 4,
                      bgcolor: "#ffffffdd",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(0,0,0,0.1)",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 10,
                        borderColor: "rgba(0,0,0,0.2)",
                      },
                    }}
                  >
                    <Avatar
                      alt={participant.name}
                      src={participant.image}
                      sx={{ width: 70, height: 70, mb: 2 }}
                    />
                    <Typography variant="h6" fontWeight="bold" align="center">
                      {participant.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                      mb={1}
                    >
                      {participant.email}
                    </Typography>
                    <Chip
                      label={participant.department}
                      color="primary"
                      size="small"
                      sx={{
                        mb: 1,
                        "&:hover": { transform: "scale(1.1)", transition: "0.3s" },
                      }}
                    />
                    {/* Team Number */}
                    {participant.teamNo && (
                      <Typography
                        variant="body2"
                        color="secondary.main"
                        align="center"
                        mb={2}
                      >
                        Team No: {participant.teamNo}
                      </Typography>
                    )}
                    <IconButton
                      color="error"
                      onClick={() =>
                        setDeleteDialog({ open: true, id: participant._id })
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialog.open}
          onClose={() => setDeleteDialog({ open: false, id: null })}
        >
          <DialogTitle>
            Are you sure you want to delete this participant?
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => setDeleteDialog({ open: false, id: null })}>
              Cancel
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => handleDelete(deleteDialog.id)}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AdminPanel;
