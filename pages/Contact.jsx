import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
  LinearProgress,
  Chip,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  Send,
  CheckCircle,
} from "@mui/icons-material";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "23b8a270-669f-437b-9988-7e4447c7ed9f",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: "Contact Form Submission - SIH Hackathon",
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Email sx={{ fontSize: 40, color: "#22d3ee" }} />,
      title: "Email Us",
      details: "support@sihhackathon.com",
      description: "Send us an email anytime",
    },
    {
      icon: <Phone sx={{ fontSize: 40, color: "#3b82f6" }} />,
      title: "Call Us",
      details: "+91 98765 43210",
      description: "Mon-Fri from 9am to 6pm",
    },
    {
      icon: <LocationOn sx={{ fontSize: 40, color: "#06b6d4" }} />,
      title: "Visit Us",
      details: "Rural Schools, India",
      description: "Come say hello at our office",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
          color: "#ffffff",
          py: { xs: 5, sm: 6, md: 8 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: { xs: 3, md: 4 }, position: "relative", zIndex: 2 }}>
            <Chip
              label="Get in Touch"
              sx={{
                backgroundColor: "rgba(34, 211, 238, 0.1)",
                color: "#22d3ee",
                border: "1px solid rgba(34, 211, 238, 0.3)",
                mb: { xs: 1.5, md: 2 },
                px: 1,
                py: 0.5,
                fontSize: { xs: "0.75rem", md: "0.875rem" },
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(34, 211, 238, 0.2)",
                  transform: "translateY(-2px)",
                },
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
              Contact Us
            </Typography>
            <Typography variant="h6" sx={{ color: "#94a3b8", maxWidth: 600, mx: "auto" }}>
              Have questions about our Automated Attendance System? We'd love to hear from you. 
              Send us a message and we'll respond as soon as possible.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Main Content - Completely Restructured */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "stretch",
          gap: { xs: 5, sm: 5, md: 6 },
          maxWidth: "1200px",
          mx: "auto",
          minHeight: { md: "600px" },
        }}>
          {/* Left Side - Contact Info */}
          <Box sx={{
            width: { xs: "100%", md: "45%" },
            backgroundColor: "#0f172a",
            borderRadius: 4,
            p: { xs: 3, sm: 3.5, md: 4 },
            position: "relative",
            overflow: "hidden",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}>
            {/* Background Pattern */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                background: "radial-gradient(circle at 20% 80%, rgba(34, 211, 238, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
                zIndex: 1,
                pointerEvents: "none",
                animation: "pulse 15s infinite alternate",
                "@keyframes pulse": {
                  "0%": { opacity: 0.7 },
                  "100%": { opacity: 1 }
                },
              }}
            />
            
            <Box sx={{ position: "relative", zIndex: 2, flex: 1, display: "flex", flexDirection: "column" }}>
              <Typography variant="h3" sx={{ 
                fontWeight: 800, 
                mb: { xs: 2, md: 3 }, 
                color: "#ffffff", 
                fontSize: { xs: "1.8rem", sm: "2rem", md: "2.2rem" } 
              }}>
                Get in Touch
              </Typography>
              <Typography variant="body1" sx={{ 
                color: "#94a3b8", 
                mb: { xs: 3, md: 4 }, 
                lineHeight: 1.6,
                fontSize: { xs: "0.9rem", sm: "0.95rem", md: "1rem" }
              }}>
                We're here to help and answer any question you might have about our 
                Automated Attendance System for Rural Schools.
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2.5, md: 3 }, mt: { xs: 1, md: 0 } }}>
                {contactInfo.map((info, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: 2, md: 3 },
                      p: { xs: 2, sm: 2.5, md: 3 },
                      borderRadius: 3,
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      backdropFilter: "blur(15px)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.12)",
                        transform: "translateX(8px)",
                        boxShadow: "0 8px 32px rgba(34, 211, 238, 0.2)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Box sx={{ 
                      p: { xs: 1.5, md: 2 }, 
                      borderRadius: 2, 
                      backgroundColor: "rgba(34, 211, 238, 0.25)",
                      border: "1px solid rgba(34, 211, 238, 0.4)",
                      boxShadow: "0 4px 16px rgba(34, 211, 238, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      {info.icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 700, 
                        mb: 0.5, 
                        color: "#ffffff",
                        fontSize: { xs: "1rem", md: "1.1rem" }
                      }}>
                        {info.title}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ 
                        fontWeight: 500, 
                        mb: 0.5, 
                        color: "#22d3ee",
                        fontSize: { xs: "0.9rem", md: "1rem" }
                      }}>
                        {info.details}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: "#94a3b8", 
                        fontSize: { xs: "0.85rem", md: "0.9rem" }
                      }}>
                        {info.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Right Side - Contact Form */}
          <Box
            sx={{
              width: { xs: "100%", md: "45%" },
              backgroundColor: "#ffffff",
              borderRadius: 4,
              p: { xs: 3, sm: 3.5, md: 4 },
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Subtle Background Pattern */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "radial-gradient(circle at 80% 20%, rgba(34, 211, 238, 0.03) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.03) 0%, transparent 50%)",
                zIndex: 1,
                pointerEvents: "none",
                animation: "pulse 15s infinite alternate-reverse",
                "@keyframes pulse": {
                  "0%": { opacity: 0.7 },
                  "100%": { opacity: 1 }
                },
              }}
            />
            
            <Box sx={{ position: "relative", zIndex: 2, flex: 1, display: "flex", flexDirection: "column" }}>
              <Box sx={{ mb: { xs: 3, md: 4 }, textAlign: "center" }}>
                <Typography variant="h3" sx={{ 
                  fontWeight: 800, 
                  color: "#0f172a", 
                  mb: { xs: 1.5, md: 2 },
                  fontSize: { xs: "1.8rem", sm: "2rem", md: "2.2rem" }
                }}>
                  Send us a Message
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: "#64748b", 
                  fontSize: { xs: "0.95rem", md: "1rem" }
                }}>
                  Fill out the form below and we'll get back to you within 24 hours.
                </Typography>
              </Box>

              <form onSubmit={handleSubmit} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2.5, md: 3 }, flex: 1 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                    variant="outlined"
                    sx={{
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                      },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: "#f8fafc",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "#ffffff",
                          boxShadow: "0 4px 12px rgba(34, 211, 238, 0.1)",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#22d3ee",
                          },
                        },
                        "&.Mui-focused": {
                          backgroundColor: "#ffffff",
                          boxShadow: "0 4px 12px rgba(34, 211, 238, 0.15)",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#22d3ee",
                            borderWidth: 2,
                          },
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#64748b",
                        transition: "color 0.3s ease",
                        "&.Mui-focused": {
                          color: "#22d3ee",
                        },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: "#f8fafc",
                        "&:hover": {
                          backgroundColor: "#ffffff",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#22d3ee",
                          },
                        },
                        "&.Mui-focused": {
                          backgroundColor: "#ffffff",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#22d3ee",
                            borderWidth: 2,
                          },
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#64748b",
                        "&.Mui-focused": {
                          color: "#22d3ee",
                        },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    error={!!errors.message}
                    helperText={errors.message}
                    required
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: "#f8fafc",
                        "&:hover": {
                          backgroundColor: "#ffffff",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#22d3ee",
                          },
                        },
                        "&.Mui-focused": {
                          backgroundColor: "#ffffff",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#22d3ee",
                            borderWidth: 2,
                          },
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#64748b",
                        "&.Mui-focused": {
                          color: "#22d3ee",
                        },
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isSubmitting}
                    startIcon={isSubmitting ? <LinearProgress sx={{ width: 20, height: 20 }} /> : <Send />}
                    sx={{
                      background: "linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)",
                      borderRadius: "999px",
                      px: { xs: 4, md: 6 },
                      py: { xs: 1.5, md: 2 },
                      textTransform: "none",
                      fontSize: { xs: "1rem", md: "1.1rem" },
                      fontWeight: 600,
                      boxShadow: "0 4px 15px rgba(34, 211, 238, 0.3)",
                      mt: 2,
                      "&:hover": {
                        background: "linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(34, 211, 238, 0.4)",
                      },
                      "&:disabled": {
                        background: "#94a3b8",
                        boxShadow: "none",
                        transform: "none",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </Box>

                {errors.submit && (
                  <Alert severity="error" sx={{ mt: 3, borderRadius: 2 }}>
                    {errors.submit}
                  </Alert>
                )}
              </form>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          icon={<CheckCircle />}
          sx={{
            backgroundColor: "#10b981",
            color: "#ffffff",
            "& .MuiAlert-icon": {
              color: "#ffffff",
            },
            borderRadius: 2,
          }}
        >
          Form submitted successfully! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </>
  );
}