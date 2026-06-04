import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { setAdmin } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { ref, set, update, get, child } from "firebase/database";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Auto-seed default admin if missing
  useEffect(() => {
    async function ensureDefaultAdmin() {
      try {
        const snap = await get(ref(db, "Users/SIH"));
        if (!snap.exists()) {
          const now = Date.now();
          await set(ref(db, "Users/SIH"), {
            username: "SIH",
            password: "SIH2025Hackathon",
            role: "admin",
            createdAt: now,
            lastLoginAt: 0,
            loginCount: 0,
          });
        }
      } catch (e) {
        // ignore seeding errors on load; user can still attempt manual login
      }
    }
    ensureDefaultAdmin();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const usersRef = ref(db, "Users");
      const snap = await get(child(usersRef, username));
      const now = Date.now();

      if (snap.exists()) {
        const record = snap.val() || {};
        const storedPassword = record?.password || "";
        if (storedPassword && storedPassword === password) {
          await update(ref(db, `Users/${username}`), {
            lastLoginAt: now,
            loginCount: (record?.loginCount || 0) + 1,
          });
          dispatch(setAdmin());
          navigate("/admin", { replace: true });
        } else {
          alert("Invalid admin credentials");
        }
      } else {
        // Seed admin if not present and the provided creds are the expected ones
        if (username === "SIH" && password === "SIH2025Hackathon") {
          await set(ref(db, `Users/${username}`), {
            username,
            password,
            role: "admin",
            createdAt: now,
            lastLoginAt: now,
            loginCount: 1,
          });
          dispatch(setAdmin());
          navigate("/admin", { replace: true });
        } else {
          alert("Admin account not found. Please use the official admin credentials.");
        }
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ maxWidth: 480, mx: "auto", p: 3, bgcolor: "transparent" }}>
      <Typography variant="h6" sx={{ mb: 1 }}>Admin Login</Typography>
      <Typography variant="body2" sx={{ color: "#475569", mb: 2 }}>
        Enter admin credentials to continue.
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField label="Admin User" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" variant="contained" disabled={loading} fullWidth sx={{ mt: 2 }}>
          {loading ? "Checking..." : "Login as Admin"}
        </Button>
      </Box>
    </Box>
  );
}


