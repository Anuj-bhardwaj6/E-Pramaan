import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Slide,
} from "@mui/material";
import {
  Close,
  Login,
  PersonAdd,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../store/authSlice";

export default function CookiePopup() {
  const user = useSelector(selectUser);
  const [showPopup, setShowPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user is not logged in and popup hasn't been dismissed
    const popupDismissed = localStorage.getItem("cookiePopupDismissed");
    if (!user && !popupDismissed) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setShowPopup(true);
        setTimeout(() => setIsVisible(true), 100);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShowPopup(false);
      localStorage.setItem("cookiePopupDismissed", "true");
    }, 300);
  };

  const handleLogin = () => {
    handleClose();
    // Navigation will be handled by the Link component
  };

  const handleSignup = () => {
    handleClose();
    // Navigation will be handled by the Link component
  };

  if (!showPopup || user) {
    return null;
  }

  return (
    <Slide direction="up" in={isVisible} timeout={300}>
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          p: 3,
          maxWidth: 350,
          borderRadius: 3,
          border: "1px solid #e5e7eb",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.15)",
          zIndex: 1300,
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#0f172a" }}>
            Welcome to SIH Hackathon! 🎓
          </Typography>
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{
              color: "#64748b",
              "&:hover": { color: "#0f172a", backgroundColor: "rgba(15, 23, 42, 0.05)" },
            }}
          >
            <Close />
          </IconButton>
        </Box>

        <Typography variant="body2" sx={{ color: "#64748b", mb: 3, lineHeight: 1.5 }}>
          Experience our Automated Attendance System for Rural Schools. 
          Sign in to access your dashboard or create an account to get started.
        </Typography>

        <Box sx={{ display: "flex", gap: 1.5, flexDirection: "column" }}>
          <Button
            component={RouterLink}
            to="/login"
            variant="contained"
            size="small"
            startIcon={<Login />}
            onClick={handleLogin}
            sx={{
              background: "linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)",
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                background: "linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)",
                transform: "translateY(-1px)",
              },
              transition: "all 0.2s ease",
            }}
          >
            Sign In
          </Button>
          
          <Button
            component={RouterLink}
            to="/signup"
            variant="outlined"
            size="small"
            startIcon={<PersonAdd />}
            onClick={handleSignup}
            sx={{
              borderColor: "#22d3ee",
              color: "#22d3ee",
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                borderColor: "#06b6d4",
                backgroundColor: "rgba(34, 211, 238, 0.1)",
                transform: "translateY(-1px)",
              },
              transition: "all 0.2s ease",
            }}
          >
            Create Account
          </Button>
        </Box>

        <Typography variant="caption" sx={{ color: "#94a3b8", mt: 2, display: "block", textAlign: "center" }}>
          You can dismiss this popup and continue browsing
        </Typography>
      </Box>
    </Slide>
  );
}