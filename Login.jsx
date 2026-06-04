import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { setUser } from "./store/authSlice";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  // forgot dialog state
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return alert("Please enter email and password");
    }
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
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
      alert(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  function openForgot() {
    setForgotEmail(email || "");
    setForgotOpen(true);
  }

  function closeForgot() {
    setForgotOpen(false);
    setForgotLoading(false);
  }

  async function handleSendReset() {
    const targetEmail = (forgotEmail || "").trim();
    if (!targetEmail) {
      alert("Please enter an email to send the reset link.");
      return;
    }

    setForgotLoading(true);
    try {
      await sendPasswordResetEmail(auth, targetEmail);
      alert("Password reset email sent. Check your inbox (and spam).");
      closeForgot();
    } catch (err) {
      console.error(err);
      const code = err?.code || "";
      if (code === "auth/user-not-found") {
        alert("No account found for that email. Please register first.");
      } else if (code === "auth/invalid-email") {
        alert("Invalid email address. Please check and try again.");
      } else if (code === "auth/too-many-requests") {
        alert("Too many attempts. Try again later.");
      } else {
        alert(err?.message || "Failed to send password reset email.");
      }
    } finally {
      setForgotLoading(false);
    }
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 3, sm: 4 }, 
            mt: { xs: 4, sm: 8 }, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            borderRadius: '16px'
          }}
        >
          <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
            Login
          </Typography>
          <Typography variant="body2" sx={{ mb: 4, color: "text.secondary" }}>
            Welcome back! Please enter your details.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <Stack spacing={2.5}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link component="button" variant="body2" onClick={openForgot}>
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" fullWidth sx={{ ...primaryGradBtnSx }} disabled={loading}>
                {loading ? "Signing in..." : "Login"}
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>

      <Dialog open={forgotOpen} onClose={closeForgot}>
        <DialogTitle>Reset password</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Enter the email for your account and we'll send a password reset link.
          </Typography>
          <TextField
            autoFocus
            label="Email"
            type="email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeForgot} disabled={forgotLoading}>
            Cancel
          </Button>
          <Button onClick={handleSendReset} variant="contained" disabled={forgotLoading}>
            {forgotLoading ? "Sending..." : "Send reset email"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
