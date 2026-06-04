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
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
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
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isAdminRoute =
    location.pathname.startsWith("/admin") || location.pathname.startsWith("/use/Admin");

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
        {/* Mobile Hamburger (LEFT side) */}
        <Box sx={{ display: { xs: "flex", sm: "none" }, alignItems: "center" }}>
          <IconButton onClick={() => setMobileOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Title */}
        <Typography variant="h6" sx={{ flexGrow: 1, color: "#0f172a", fontWeight: 700 }}>
          SIH Hackathon
        </Typography>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1.25, alignItems: "center" }}>
          {isAdminRoute ? (
            <Button component={RouterLink} to="/admin" sx={ghostBtnSx}>
              Admin Dashboard
            </Button>
          ) : (
            <>
              <Button component={RouterLink} to="/" sx={ghostBtnSx}>
                Home
              </Button>
              <Button component={RouterLink} to="/contact" sx={ghostBtnSx}>
                Contact Us
              </Button>
              <Button component={RouterLink} to="/about" sx={ghostBtnSx}>
                About Project
              </Button>
              {user && (
                <>
                  <Button
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
                    <MenuItem component={RouterLink} to="/add-student" onClick={handleMoreMenuClose}>
                      Add Student
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/attendance-manual" onClick={handleMoreMenuClose}>
                      Attendance Manually
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/facial-attendance" onClick={handleMoreMenuClose}>
                      Facial Attendance
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/face-management" onClick={handleMoreMenuClose}>
                      Face Management
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/details" onClick={handleMoreMenuClose}>
                      Students Detail
                    </MenuItem>
                  </Menu>
                </>
              )}
            </>
          )}
        </Box>

        {/* Right Side (User / Login) */}
        {!user ? (
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
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

        {/* Mobile Drawer */}
        <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}>
          <Box sx={{ width: 250 }}>
            {/* Close Button at Top */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
              <IconButton onClick={() => setMobileOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <List>
              <ListItem button component={RouterLink} to="/">
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button component={RouterLink} to="/contact">
                <ListItemText primary="Contact Us" />
              </ListItem>
              <ListItem button component={RouterLink} to="/about">
                <ListItemText primary="About Project" />
              </ListItem>
              {user && (
                <>
                  <ListItem button component={RouterLink} to="/add-student">
                    <ListItemText primary="Add Student" />
                  </ListItem>
                  <ListItem button component={RouterLink} to="/attendance-manual">
                    <ListItemText primary="Attendance Manually" />
                  </ListItem>
                  <ListItem button component={RouterLink} to="/facial-attendance">
                    <ListItemText primary="Facial Attendance" />
                  </ListItem>
                  <ListItem button component={RouterLink} to="/face-management">
                    <ListItemText primary="Face Management" />
                  </ListItem>
                  <ListItem button component={RouterLink} to="/details">
                    <ListItemText primary="Students Detail" />
                  </ListItem>
                </>
              )}
              {!user && !isAdminRoute && (
                <ListItem button component={RouterLink} to="/login">
                  <ListItemText primary="Login" />
                </ListItem>
              )}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
