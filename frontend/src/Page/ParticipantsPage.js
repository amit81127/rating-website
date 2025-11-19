import React, { useState, useCallback, useMemo, memo } from "react";
import axios from "axios";
import useSWRInfinite from "swr/infinite";
import { useInView } from "react-intersection-observer";
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
  Paper,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
  Skeleton,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkIcon from "@mui/icons-material/Link";
import API_URL from "../api";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const VOTE_STORAGE_KEY = "guestVotes";
const VOTE_COOLDOWN_MS = 12 * 60 * 60 * 1000;

// ---- Optimized Lazy Image ----
const LazyImage = ({ src, alt }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "300px",
  });

  return (
    <Box
      ref={ref}
      component="img"
      src={inView ? src : ""}
      alt={alt}
      loading="lazy"
      sx={{
        width: "100%",
        height: 150,
        objectFit: "cover",
        borderRadius: 2,
        mb: 2,
        background: "#e0e0e0",
        filter: inView ? "blur(0px)" : "blur(10px)",
        transition: "filter 0.4s ease-out",
      }}
    />
  );
};

// ---- Memoized Card ----
const ParticipantCard = memo(({ participant, voted, onVote }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Paper
      elevation={10}
      sx={{
        width: 300,
        height: 500,
        p: 2,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "0.25s",
        "&:hover": { transform: "translateY(-8px)", boxShadow: 8 },
      }}
    >
      <Box
        sx={{
          py: 1,
          mb: 1,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 18,
          color: "#fff",
          background: "linear-gradient(90deg, #4b6cb7, #182848)",
          borderRadius: 2,
        }}
      >
        {participant.name}
      </Box>

      {participant.projectName && (
        <Box
          sx={{
            py: 0.5,
            fontWeight: "bold",
            textAlign: "center",
            background: "#c3cfe2",
            borderRadius: 2,
            mb: 1,
          }}
        >
          {participant.projectName}
        </Box>
      )}

      {participant.email && (
        <Typography align="center" sx={{ fontWeight: "bold", mb: 1 }}>
          {participant.email}
        </Typography>
      )}

      <LazyImage src={participant.image} alt={participant.name} />

      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: "bold" }}>
          Team: {participant.teamNo || "-"}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            border: "1px dashed #4b6cb7",
            p: 1,
            borderRadius: 2,
            background: "#fff",
            mt: 1,
          }}
        >
          {participant.description}
        </Typography>
      </Box>

      {!voted ? (
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, fontWeight: "bold" }}
          onClick={() => onVote(participant._id)}
        >
          Vote
        </Button>
      ) : (
        <Typography align="center" color="green" mt={2}>
          ✅ You have voted
        </Typography>
      )}
    </Paper>
  </Grid>
));

const ParticipantsPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // ---- SWR Infinite for Pagination ----
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.data.length) return null; // reached the end
    return `${API_URL}/allParticipants?page=${pageIndex + 1}&limit=6`;
  };

  const { data, error, mutate, size, setSize, isLoading } = useSWRInfinite(
    getKey,
    fetcher,
    {
      revalidateFirstPage: false,
      revalidateOnFocus: false,
    }
  );

  const allParticipants = data ? data.flatMap((page) => {
    // Handle both new pagination format { data: [...] } and old array format [...]
    if (Array.isArray(page)) return page;
    return page.data || [];
  }) : [];
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.data?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.data?.length < 6);

  const loading = isLoading && !data;

  const getGuestVotes = () => {
    try {
      return JSON.parse(localStorage.getItem(VOTE_STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  };

  // ---- Voting Logic ----
  const handleVote = useCallback(
    async (id) => {
      const votes = getGuestVotes();
      const lastVote = votes[id];

      if (lastVote && Date.now() - lastVote < VOTE_COOLDOWN_MS) {
        setSnackbar({ open: true, message: "You already voted!", severity: "info" });
        return;
      }

      // Optimistic UI update
      mutate(
        (currentData) => {
          if (!currentData) return currentData;
          return currentData.map((page) => ({
            ...page,
            data: page.data.map((p) =>
              p._id === id ? { ...p, votes: (p.votes || 0) + 1 } : p
            ),
          }));
        },
        { revalidate: false }
      );

      votes[id] = Date.now();
      localStorage.setItem(VOTE_STORAGE_KEY, JSON.stringify(votes));

      try {
        await axios.post(`${API_URL}/voteParticipant/${id}`);
        mutate(); // refresh from server
        setSnackbar({ open: true, message: "Vote Successful!", severity: "success" });
      } catch {
        setSnackbar({ open: true, message: "Vote Failed!", severity: "error" });
        mutate();
      }
    },
    [mutate]
  );

  // ---- Share ----
  const handleShareClick = (e) => setAnchorEl(e.currentTarget);
  const handleShareClose = (platform) => {
    setAnchorEl(null);
    if (!platform) return;

    const url = window.location.href;

    const links = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    };

    if (platform === "link") {
      navigator.clipboard.writeText(url);
      setSnackbar({ open: true, message: "Link Copied!", severity: "success" });
      return;
    }

    window.open(links[platform], "_blank");
  };

  const guestVotes = useMemo(() => getGuestVotes(), [allParticipants]);

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" align="center" fontWeight="bold" sx={{ mb: 4 }}>
        🏅 Participants of the Event
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Button variant="outlined" startIcon={<ShareIcon />} onClick={handleShareClick}>
          Share Participants
        </Button>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleShareClose(null)}>
          <MenuItem onClick={() => handleShareClose("whatsapp")}>
            <WhatsAppIcon sx={{ mr: 1 }} /> WhatsApp
          </MenuItem>
          <MenuItem onClick={() => handleShareClose("facebook")}>
            <FacebookIcon sx={{ mr: 1 }} /> Facebook
          </MenuItem>
          <MenuItem onClick={() => handleShareClose("twitter")}>
            <TwitterIcon sx={{ mr: 1 }} /> Twitter
          </MenuItem>
          <MenuItem onClick={() => handleShareClose("link")}>
            <LinkIcon sx={{ mr: 1 }} /> Copy Link
          </MenuItem>
        </Menu>
      </Box>

      {/* PARTICIPANT GRID */}
      <Grid container spacing={4} justifyContent="center">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Grid key={i} item xs={12} sm={6} md={4}>
                <Skeleton variant="rectangular" height={500} sx={{ borderRadius: 3 }} />
              </Grid>
            ))
          : allParticipants?.map((p) => {
              const voted =
                guestVotes[p._id] &&
                Date.now() - guestVotes[p._id] < VOTE_COOLDOWN_MS;

              return (
                <ParticipantCard
                  key={p._id}
                  participant={p}
                  voted={voted}
                  onVote={handleVote}
                />
              );
            })}
      </Grid>

      {/* Load More Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        {!isReachingEnd && (
          <Button
            variant="contained"
            onClick={() => setSize(size + 1)}
            disabled={isLoadingMore}
            sx={{ fontWeight: "bold", px: 4, py: 1.5 }}
          >
            {isLoadingMore ? "Loading..." : "Load More"}
          </Button>
        )}
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default ParticipantsPage;
