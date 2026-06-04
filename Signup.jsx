import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "./store/authSlice";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const primaryGradBtnSx = {
    color: "common.white",
    textTransform: "none",
    borderRadius: "10px",
    height: 44,
    background: "linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)",
    boxShadow: "0 10px 24px rgba(59,130,246,0.35)",
    border: "1px solid rgba(255,255,255,0.18)",
    transition: "all .2s ease",
    "&:hover": {
      background: "linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)",
      transform: "translateY(-1px)",
      boxShadow: "0 14px 30px rgba(37,99,235,0.45)",
    },
  };

  const googleBtnSx = {
    textTransform: "none",
    borderRadius: "10px",
    height: 44,
    color: "#fff",
    backgroundColor: "#1a73e8",
    border: "1px solid rgba(255,255,255,0.15)",
    boxShadow: "0 6px 16px rgba(26,115,232,0.35)",
    transition: "all .2s ease",
    "&:hover": {
      backgroundColor: "#1669c1",
      transform: "translateY(-1px)",
      boxShadow: "0 10px 22px rgba(26,115,232,0.45)",
    },
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!email || !password || !confirm) {
      return alert("Please complete all fields");
    }
    if (password !== confirm) {
      return alert("Passwords do not match");
    }

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name && cred.user) {
        await updateProfile(cred.user, { displayName: name });
      }
      const user = cred.user;
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          name: user.displayName || name || "",
          photoURL: user.photoURL || "",
        })
      );
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      alert(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignup() {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      const user = cred.user;
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          name: user.displayName || "",
          photoURL: user.photoURL || "",
        })
      );
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
      alert(err?.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  const passwordMismatch = touched && password !== confirm && confirm.length > 0;
  const disabled = !email || !password || !confirm || passwordMismatch || loading;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <Typography component="h1" variant="h5" sx={{ mb: 0.5 }}>
        Sign up
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: "#64748b" }}>
        Create your account to continue.
      </Typography>

      <TextField
        label="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full name"
        InputProps={{
          sx: {
            color: '#0f172a',
            '& .MuiInputBase-input::placeholder': { color: '#000', opacity: 0.6 },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#000' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#000' },
          }
        }}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        InputProps={{
          sx: {
            color: '#0f172a',
            '& .MuiInputBase-input::placeholder': { color: '#000', opacity: 0.6 },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#000' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#000' },
          }
        }}
        required
        fullWidth
        margin="normal"
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        InputProps={{
          sx: {
            color: '#0f172a',
            '& .MuiInputBase-input::placeholder': { color: '#000', opacity: 0.6 },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#000' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#000' },
          }
        }}
        required
        fullWidth
        margin="normal"
        helperText="Use a strong password"
      />

      <TextField
        label="Confirm password"
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        placeholder="Confirm password"
        InputProps={{
          sx: {
            color: '#0f172a',
            '& .MuiInputBase-input::placeholder': { color: '#000', opacity: 0.6 },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#000' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#000' },
          }
        }}
        required
        fullWidth
        margin="normal"
        error={passwordMismatch}
        helperText={passwordMismatch ? "Passwords do not match" : ""}
        onBlur={() => setTouched(true)}
      />

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, ...primaryGradBtnSx }} disabled={disabled}>
        {loading ? "Creating account..." : "Create account"}
      </Button>

      <Grid container justifyContent="flex-end" sx={{ mt: 1 }}>
        <Grid item>
          <Link component={RouterLink} to="/login" variant="body2">
            Back to login
          </Link>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2, color: "#94a3b8" }}>or</Divider>

      <Button onClick={handleGoogleSignup} fullWidth sx={googleBtnSx} disabled={loading}>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            mr: 1,
            borderRadius: "50%",
            backgroundColor: "#fff",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.9-6.9C35.9 1.9 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l8.02 6.23C12.3 13.2 17.7 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24.5c0-1.56-.14-3.06-.4-4.5H24v9h12.7c-.55 2.97-2.16 5.48-4.6 7.18l7.02 5.45C43.88 38.06 46.5 31.78 46.5 24.5z"/>
            <path fill="#FBBC05" d="M10.58 28.45A14.5 14.5 0 0 1 9.5 24c0-1.55.27-3.04.75-4.43l-8.02-6.23A23.93 23.93 0 0 0 0 24c0 3.86.92 7.5 2.56 10.78l8.02-6.33z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.82l-7.02-5.45c-1.95 1.3-4.45 2.07-8.88 2.07-6.3 0-11.7-3.7-13.42-9.95l-8.02 6.33C6.51 42.62 14.62 48 24 48z"/>
          </svg>
        </Box>
        Continue with Google
      </Button>
    </Box>
  );
}