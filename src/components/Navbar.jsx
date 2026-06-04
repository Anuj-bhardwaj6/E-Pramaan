import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectUser, selectIsAdmin } from "../store/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import defaultAvatar from "../assets/user.png";

export default function Navbar() {
  const user = useSelector(selectUser);
  const isAdmin = useSelector(selectIsAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [moreAnchorEl, setMoreAnchorEl] = React.useState(null);
  const isAdminRoute = location.pathname.startsWith("/admin") || location.pathname.startsWith("/use/Admin");

  // Modern button styles
  const ghostBtnSx = {
    color: "#0f172a",
    textTransform: "none",
    borderRadius: "999px",
    px: 2,
    height: 36,
    backgroundColor: "#ffffff",
    border: "none",
    transition: "all .2s ease",
    "&:hover": {
      backgroundColor: "#f8fafc",
      transform: "translateY(-1px)",
    },
  };

  const primaryGradBtnSx = {
    color: "#ffffff",
    textTransform: "none",
    borderRadius: "999px",
    px: 2.4,
    height: 36,
    background: "linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)",
    border: "1px solid rgba(37,99,235,0.15)",
    transition: "all .2s ease",
    "&:hover": {
      background: "linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)",
      transform: "translateY(-1px)",
    },
  };

  function openMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function closeMenu() {
    setAnchorEl(null);
  }

  const handleMoreMenuClick = (event) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setMoreAnchorEl(null);
  };

  async function handleLogout() {
    try {
      await signOut(auth);
    } finally {
      dispatch(clearUser());
      navigate("/login", { replace: true });
    }
  }

  const displayName = user?.name || user?.email || "";
  const initial = displayName?.charAt(0)?.toUpperCase() || "U";
  const avatarSrc = user?.photoURL || defaultAvatar;

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar sx={{ display: "flex", gap: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1, color: "#0f172a", fontWeight: 700 }}>
          SIH Hackathon
        </Typography>

        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1.25, alignItems: "center" }} className="desktop-only">
          {isAdminRoute ? (
            <Button component={RouterLink} to="/admin" color="inherit" sx={ghostBtnSx}>
              Admin Dashboard
            </Button>
          ) : (
            <>
              <Button component={RouterLink} to="/" color="inherit" sx={ghostBtnSx}>
                Home
              </Button>
              <Button component={RouterLink} to="/contact" color="inherit" sx={ghostBtnSx}>
                Contact Us
              </Button>
              <Button component={RouterLink} to="/about" color="inherit" sx={ghostBtnSx}>
                About Project
              </Button>
              {user && (
                <>
                  <Button
                    color="inherit"
                    sx={ghostBtnSx}
                    aria-controls={moreAnchorEl ? "more-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={Boolean(moreAnchorEl)}
                    onClick={handleMoreMenuClick}
                  >
                    More
                  </Button>
                  <Menu
                    id="more-menu"
                    anchorEl={moreAnchorEl}
                    open={Boolean(moreAnchorEl)}
                    onClose={handleMoreMenuClose}
                  >
                    <MenuItem onClick={handleMoreMenuClose} component={RouterLink} to="/add-student">Add Student</MenuItem>
                    <MenuItem onClick={handleMoreMenuClose} component={RouterLink} to="/attendance-manual">Attendance Manually</MenuItem>
                    <MenuItem onClick={handleMoreMenuClose} component={RouterLink} to="/facial-attendance">Facial Attendance</MenuItem>
                    <MenuItem onClick={handleMoreMenuClose} component={RouterLink} to="/face-management">Add / Remove / Update Face</MenuItem>
                    <MenuItem onClick={handleMoreMenuClose} component={RouterLink} to="/details">Students Detail</MenuItem>
                  </Menu>
                </>
              )}
            </>
          )}
        </Box>

        {!user ? (
          <Box sx={{ display: "flex", gap: 1 }}>
            {!isAdminRoute && (
              <Button component={RouterLink} to="/login" sx={primaryGradBtnSx}>
                Login
              </Button>
            )}
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body1" sx={{ color: "#0f172a", display: { xs: "none", sm: "block" } }}>
              Hii {user?.name || user?.email}
            </Typography>
            <IconButton color="inherit" onClick={openMenu} size="small">
              <Avatar src={avatarSrc} sx={{ width: 32, height: 32 }}>
                {initial}
              </Avatar>
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu} keepMounted>
              {/* ✅ Profile added above Dashboard */}
              <MenuItem onClick={() => { closeMenu(); navigate("/profile"); }}>Profile</MenuItem>
              {!isAdminRoute && (
                <MenuItem onClick={() => { closeMenu(); navigate("/dashboard"); }}>Dashboard</MenuItem>
              )}
              {isAdmin && (
                <MenuItem onClick={() => { closeMenu(); navigate("/admin"); }}>Admin Panel</MenuItem>
              )}
              <MenuItem onClick={() => { closeMenu(); handleLogout(); }}>Logout</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
