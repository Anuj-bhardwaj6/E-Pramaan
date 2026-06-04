import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  
} from "@mui/material";
import {
  School,
  Face,
  Analytics,
  Notifications,
  OfflineBolt,
  Security,
  Speed,
} from "@mui/icons-material";
// Box is already imported in the destructured import above
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../store/authSlice";

export default function Home() {
  const user = useSelector(selectUser);

  const features = [
    {
      icon: <Face sx={{ fontSize: 40, color: "#22d3ee" }} />,
      title: "Automated Face Recognition",
      description: "Advanced AI-powered facial recognition for accurate student identification.",
    },
    {
      icon: <Analytics sx={{ fontSize: 40, color: "#3b82f6" }} />,
      title: "Real-time Analytics",
      description: "Dashboard with attendance trends, reports, and insights for better decision making.",
    },
    {
      icon: <OfflineBolt sx={{ fontSize: 40, color: "#06b6d4" }} />,
      title: "Offline Capability",
      description: "Works seamlessly in rural areas with limited internet connectivity using offline-first architecture.",
    },
    {
      icon: <Notifications sx={{ fontSize: 40, color: "#8b5cf6" }} />,
      title: "Parent Notifications",
      description: "Instant SMS and email notifications to parents about their child's attendance status.",
    },
    {
      icon: <Security sx={{ fontSize: 40, color: "#10b981" }} />,
      title: "Secure & Private",
      description: "End-to-end encryption ensures student data privacy and security compliance.",
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: "#f59e0b" }} />,
      title: "Lightning Fast",
      description: "Optimized for low-end devices commonly found in rural schools for smooth performance.",
    },
  ];

  const stats = [
    { number: "500+", label: "Schools Covered" },
    { number: "50K+", label: "Students Enrolled" },
    { number: "99.2%", label: "Accuracy Rate" },
    { number: "24/7", label: "Support Available" },
    { number: "170+", label: "Rural Locations" },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
          color: "#ffffff",
          py: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Chip
                  label="SIH Hackathon 2025"
                  sx={{
                    backgroundColor: "rgba(34, 211, 238, 0.1)",
                    color: "#22d3ee",
                    border: "1px solid rgba(34, 211, 238, 0.3)",
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    background: "linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Automated Attendance System
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 3, color: "#e2e8f0" }}>
                  for Rural Schools
                </Typography>
                <Typography variant="h6" sx={{ color: "#94a3b8", mb: 4, lineHeight: 1.6 }}>
                  Bridging the digital divide in education through innovative technology solutions. 
                  Empowering rural schools with smart attendance tracking and comprehensive student management.
                </Typography>
              </Box>
              
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {user ? (
                  <Button
                    component={RouterLink}
                    to="/dashboard"
                    variant="contained"
                    size="large"
                    sx={{
                      background: "linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)",
                      borderRadius: "999px",
                      px: 4,
                      py: 1.5,
                      textTransform: "none",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      "&:hover": {
                        background: "linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Go to Dashboard
                  </Button>
                ) : (
                  <>
                    <Button
                      component={RouterLink}
                      to="/signup"
                      variant="contained"
                      size="large"
                      sx={{
                        background: "linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)",
                        borderRadius: "999px",
                        px: 4,
                        py: 1.5,
                        textTransform: "none",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        "&:hover": {
                          background: "linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      Get Started
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/about"
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: "#22d3ee",
                        color: "#22d3ee",
                        borderRadius: "999px",
                        px: 4,
                        py: 1.5,
                        textTransform: "none",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        "&:hover": {
                          borderColor: "#06b6d4",
                          backgroundColor: "rgba(34, 211, 238, 0.1)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      Learn More
                    </Button>
                  </>
                )}
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <School
                  sx={{
                    fontSize: { xs: 200, md: 300 },
                    color: "rgba(34, 211, 238, 0.3)",
                    opacity: 0.8,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} sx={{ alignItems: "stretch", justifyContent: "center" }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: 3,
                  border: "1px solid #e5e7eb",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.1)",
                  },
                  transition: "all 0.3s ease",
                  backgroundColor: '#fff'
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 1,
                  }}
                >
                  {stat.number}
                </Typography>
                <Typography variant="body1" sx={{ color: "#64748b", fontWeight: 500 }}>
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ backgroundColor: "#f8fafc", py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#0f172a",
                mb: 2,
              }}
            >
              Key Features
            </Typography>
            <Typography variant="h6" sx={{ color: "#64748b", maxWidth: 600, mx: "auto" }}>
              Comprehensive solution designed specifically for rural educational environments
            </Typography>
          </Box>

          <Grid 
            container 
            spacing={{ xs: 3, sm: 4, md: 5, lg: 6 }}
            sx={{ 
              alignItems: "stretch",
              justifyContent: "center"
            }}
          >
            {features.map((feature, index) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                lg={4} 
                xl={4} 
                key={index}
                sx={{
                  display: "flex",
                  maxWidth: { xs: "100%", sm: "550px" }
                }}
              >
                <Card
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 10px 30px rgba(15, 23, 42, 0.1)",
                    },
                    transition: "all 0.3s ease",
                    mx: { xs: 0, sm: 1, md: 2 },
                    overflow: "hidden"
                  }}
                >
                  <CardContent 
                    sx={{ 
                      p: { xs: 3, md: 4 }, 
                      flexGrow: 1, 
                      display: "flex", 
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    <Box 
                      sx={{ 
                        mb: 3, 
                        textAlign: "center",
                        backgroundColor: "rgba(34, 211, 238, 0.1)",
                        borderRadius: "50%",
                        p: 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 70,
                        height: 70
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600, 
                        mb: 2, 
                        color: "#0f172a", 
                        textAlign: "center",
                        fontSize: { xs: "1.1rem", md: "1.25rem" }
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: "#64748b", 
                        lineHeight: 1.6, 
                        textAlign: "center", 
                        flexGrow: 1,
                        fontSize: { xs: "0.875rem", md: "1rem" }
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 4,
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            color: "#ffffff",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Ready to Transform Rural Education?
          </Typography>
          <Typography variant="h6" sx={{ color: "#94a3b8", mb: 4, maxWidth: 600, mx: "auto" }}>
            Join thousands of schools already using our automated attendance system 
            to improve student tracking and parent engagement.
          </Typography>
          <Button
            component={RouterLink}
            to={user ? "/dashboard" : "/signup"}
            variant="contained"
            size="large"
            sx={{
              background: "linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)",
              borderRadius: "999px",
              px: 6,
              py: 2,
              textTransform: "none",
              fontSize: "1.2rem",
              fontWeight: 600,
              "&:hover": {
                background: "linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            {user ? "Access Dashboard" : "Start Free Trial"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}