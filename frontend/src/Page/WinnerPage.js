import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Avatar,
  Box,
  LinearProgress,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import API_URL from "../api";
const sidebarCollapsedWidth = 50;
const sidebarExpandedWidth = 150;

const WinnersPage = () => {
  const [winnersData, setWinnersData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/allParticipantsByVotes`)
      .then((res) => {
        const sorted = res.data.sort((a, b) => b.votes - a.votes);
        setWinnersData(sorted);
      })
      .catch((err) => console.error("Error fetching participants:", err));
  }, []);

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
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
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
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Container
        sx={{
          py: 4,
          ml: sidebarCollapsedWidth,
          width: `calc(100% - ${sidebarCollapsedWidth}px)`,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "primary.main", mb: 4 }}
        >
          🏆 Event Winners
        </Typography>

        <Grid container spacing={2} direction="column" alignItems="center">
          {winnersData.map((winner, index) => (
            <Tooltip key={winner._id} title={`${winner.name} - ${winner.votes} votes`} arrow>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  maxWidth: 600,
                  bgcolor:
                    index === 0
                      ? "#FFD700"
                      : index === 1
                      ? "#C0C0C0"
                      : index === 2
                      ? "#CD7F32"
                      : "#f5f5f5",
                  borderRadius: 2,
                  p: 2,
                  mb: 1,
                  boxShadow: 1,
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.02)" },
                }}
              >
                <Avatar
                  alt={winner.name}
                  src={winner.image}
                  sx={{ width: 50, height: 50, mr: 2 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {index + 1}. {winner.name} ({winner.department})
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(winner.votes / winnersData[0].votes) * 100}
                    sx={{ height: 10, borderRadius: 5, mt: 1 }}
                    color={index === 0 ? "warning" : index === 1 ? "info" : "primary"}
                  />
                </Box>
                <Typography sx={{ ml: 2, fontWeight: "bold" }}>{winner.votes} votes</Typography>
              </Box>
            </Tooltip>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WinnersPage;
