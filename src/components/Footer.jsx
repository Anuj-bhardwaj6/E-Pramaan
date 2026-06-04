import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import {
  School,
  LocationOn,
  Email,
  Phone,
  Facebook,
  Twitter,
  LinkedIn,
  GitHub,
} from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0f172a",
        color: "#ffffff",
        mt: "auto",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Project Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <School sx={{ mr: 1, color: "#22d3ee" }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  SIH Hackathon
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "#94a3b8", mb: 2 }}>
                Automated Attendance System for Rural Schools - Bridging the digital divide 
                in education through innovative technology solutions.
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748b" }}>
                Empowering rural education with smart attendance tracking and 
                comprehensive student management.
              </Typography>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                href="/"
                sx={{
                  color: "#94a3b8",
                  textDecoration: "none",
                  "&:hover": { color: "#22d3ee" },
                  transition: "color 0.2s ease",
                }}
              >
                Home
              </Link>
              <Link
                href="/about"
                sx={{
                  color: "#94a3b8",
                  textDecoration: "none",
                  "&:hover": { color: "#22d3ee" },
                  transition: "color 0.2s ease",
                }}
              >
                About Project
              </Link>
              <Link
                href="/contact"
                sx={{
                  color: "#94a3b8",
                  textDecoration: "none",
                  "&:hover": { color: "#22d3ee" },
                  transition: "color 0.2s ease",
                }}
              >
                Contact Us
              </Link>
              <Link
                href="/dashboard"
                sx={{
                  color: "#94a3b8",
                  textDecoration: "none",
                  "&:hover": { color: "#22d3ee" },
                  transition: "color 0.2s ease",
                }}
              >
                Dashboard
              </Link>
            </Box>
          </Grid>

          {/* Features */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Key Features
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                • Automated Face Recognition
              </Typography>
              <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                • Real-time Attendance Tracking
              </Typography>
              <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                • Offline Capability
              </Typography>
              <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                • Parent Notifications
              </Typography>
              <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                • Analytics Dashboard
              </Typography>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Contact Info
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocationOn sx={{ mr: 1, color: "#22d3ee", fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                  Rural Schools, India
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Email sx={{ mr: 1, color: "#22d3ee", fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                  support@sihhackathon.com
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Phone sx={{ mr: 1, color: "#22d3ee", fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                  +91 98765 43210
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "#334155" }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: "#64748b" }}>
            © 2024 SIH Hackathon. All rights reserved. Made with ❤️ for rural education.
          </Typography>
          
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              sx={{
                color: "#94a3b8",
                "&:hover": { color: "#22d3ee", backgroundColor: "rgba(34, 211, 238, 0.1)" },
                transition: "all 0.2s ease",
              }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              sx={{
                color: "#94a3b8",
                "&:hover": { color: "#22d3ee", backgroundColor: "rgba(34, 211, 238, 0.1)" },
                transition: "all 0.2s ease",
              }}
            >
              <Twitter />
            </IconButton>
            <IconButton
              sx={{
                color: "#94a3b8",
                "&:hover": { color: "#22d3ee", backgroundColor: "rgba(34, 211, 238, 0.1)" },
                transition: "all 0.2s ease",
              }}
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              sx={{
                color: "#94a3b8",
                "&:hover": { color: "#22d3ee", backgroundColor: "rgba(34, 211, 238, 0.1)" },
                transition: "all 0.2s ease",
              }}
            >
              <GitHub />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}