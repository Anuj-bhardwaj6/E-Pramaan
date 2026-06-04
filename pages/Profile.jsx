import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/authSlice";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import { motion } from "framer-motion";

export default function Profile() {
  const user = useSelector(selectUser);

  if (!user) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
        }}
      >
        <Typography variant="h6" color="white">
          No user logged in
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        width: "100%",
        background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
        flexDirection: "column",
        color: "white",
        textAlign: "center",
        px: 2,
      }}
    >
      {/* Avatar */}
      <motion.div whileHover={{ scale: 1.05 }}>
        <Avatar
          src={user.photoURL}
          alt={user.name || user.email}
          sx={{
            width: 140,
            height: 140,
            mb: 2,
            border: "5px solid white",
          }}
        >
          {user.name?.charAt(0).toUpperCase()}
        </Avatar>
      </motion.div>

      {/* Name */}
      <Typography variant="h3" fontWeight="bold">
        {user.name || "No Name"}
      </Typography>

      {/* Email */}
      <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
        {user.email}
      </Typography>

      <Divider
        sx={{
          width: "60%",
          borderColor: "rgba(255,255,255,0.5)",
          my: 3,
        }}
      />

      {/* Extra Info */}
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          UID: {user.uid}
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          Role: {user.isAdmin ? "Admin" : "Student/User"}
        </Typography>
      </Stack>

      {/* Action Buttons */}
      <Stack direction="row" spacing={3} justifyContent="center">
        <Button
          variant="contained"
          color="secondary"
          startIcon={<EditIcon />}
          sx={{
            borderRadius: 3,
            textTransform: "none",
            px: 4,
            fontSize: "1rem",
          }}
        >
          Edit Profile
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          sx={{
            borderRadius: 3,
            textTransform: "none",
            px: 4,
            fontSize: "1rem",
            borderWidth: 2,
            "&:hover": { borderWidth: 2 },
          }}
        >
          Logout
        </Button>
      </Stack>
    </Box>
  );
}
