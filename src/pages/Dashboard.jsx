import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { selectIsAdmin } from "../store/authSlice";
import { Link as RouterLink } from "react-router-dom";

export default function Dashboard() {
  const isAdmin = useSelector(selectIsAdmin);
  return (
    <Box>
      <Typography variant="h4" sx={{ color: "#0f172a", mb: 1 }}>
        Dashboard
      </Typography>
      <Typography variant="body1" sx={{ color: "#334155" }}>
        Your quick links and stats will appear here.
      </Typography>
      {isAdmin && (
        <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
          <Button component={RouterLink} to="/admin" variant="contained">
            Open Admin Panel
          </Button>
        </Box>
      )}
    </Box>
  );
}


