// src/pages/StudentsDetails.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function StudentsDetails() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  // Dropdown values
  const [year, setYear] = useState("2025");
  const [studentClass, setStudentClass] = useState("1st");

  // Build Firebase URL dynamically
  const BASE_URL = `https://lpu2hand-default-rtdb.firebaseio.com/StudentsInfo/${year}/${studentClass}`;

  useEffect(() => {
    fetchStudents();
  }, [year, studentClass]); // re-fetch when dropdown changes

  // 🔹 Fetch students
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}.json`);
      const data = await res.json();

      if (data) {
        const formattedData = Object.entries(data).map(([id, student]) => ({
          id,
          ...student,
        }));
        setStudents(formattedData);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete Student
  const handleDelete = async (id) => {
    try {
      await fetch(`${BASE_URL}/${id}.json`, { method: "DELETE" });
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // 🔹 Open Edit Dialog
  const handleEdit = (student) => {
    setCurrentStudent(student);
    setEditDialogOpen(true);
  };

  // 🔹 Save Edited Student
  const handleSave = async () => {
    if (!currentStudent) return;
    try {
      await fetch(`${BASE_URL}/${currentStudent.id}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentStudent),
      });
      setStudents((prev) =>
        prev.map((s) => (s.id === currentStudent.id ? currentStudent : s))
      );
      setEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" align="center" gutterBottom>
        Students Details
      </Typography>

      {/* 🔹 Dropdown Filters */}
      <Box display="flex" justifyContent="center" gap={3} mb={4}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select value={year} onChange={(e) => setYear(e.target.value)}>
            <MenuItem value="2024">2024</MenuItem>
            <MenuItem value="2025">2025</MenuItem>
            <MenuItem value="2026">2026</MenuItem>
            <MenuItem value="2027">2027</MenuItem>
          </Select>
        </FormControl>

        

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Class</InputLabel>
          <Select value={studentClass} onChange={(e) => setStudentClass(e.target.value)}>
            <MenuItem value="PG">PG</MenuItem>
            <MenuItem value="Nursery">Nursery</MenuItem>
            <MenuItem value="LKG">LKG</MenuItem>
            <MenuItem value="UKG">UKG</MenuItem>
            <MenuItem value="1st">1st</MenuItem>
            <MenuItem value="2nd">2nd</MenuItem>
            <MenuItem value="3rd">3rd</MenuItem>
            <MenuItem value="4th">4th</MenuItem>
            <MenuItem value="5th">5th</MenuItem>
            <MenuItem value="6th">6th</MenuItem>
            <MenuItem value="7th">7th</MenuItem>
            <MenuItem value="8th">8th</MenuItem>
            <MenuItem value="9th">9th</MenuItem>
            <MenuItem value="10th">10th</MenuItem>
            <MenuItem value="11th">11th</MenuItem>
            <MenuItem value="12th">12th</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* 🔹 Loading */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {students.length > 0 ? (
            students.map((student) => (
              <Grid item xs={12} sm={6} md={4} key={student.id}>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: 3,
                    p: 3,
                    textAlign: "center",
                    boxShadow: 3,
                    transition: "0.3s",
                    "&:hover": { transform: "scale(1.03)" },
                  }}
                >
                  <Avatar
                    src={student.photo}
                    alt={student.studentName}
                    sx={{ width: 100, height: 100, margin: "auto", mb: 2 }}
                  />
                  <Typography variant="h6">{student.studentName}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Roll No: {student.studentRollNo} | Class: {student.studentClass}
                  </Typography>

                  <Box mt={2} textAlign="left">
                    <Typography><b>Aadhaar:</b> {student.aadharNumber}</Typography>
                    <Typography><b>Father:</b> {student.fatherName} ({student.fatherOccupation})</Typography>
                    <Typography><b>Mother:</b> {student.motherName} ({student.motherOccupation})</Typography>
                    <Typography><b>DOB:</b> {student.dob}</Typography>
                    <Typography><b>Gender:</b> {student.gender}</Typography>
                    <Typography><b>Mobile:</b> {student.mobileNumber}</Typography>
                    <Typography><b>Blood Group:</b> {student.bloodGroup}</Typography>
                    <Typography><b>Category:</b> {student.category}</Typography>
                    <Typography><b>Religion:</b> {student.religion}</Typography>
                    <Typography><b>Address:</b> {student.address}</Typography>
                  </Box>

                  {/* Action Buttons */}
                  <Box mt={2} display="flex" justifyContent="center" gap={2}>
                    <IconButton color="primary" onClick={() => handleEdit(student)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(student.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" align="center" sx={{ width: "100%", mt: 4 }}>
              No students found for {year}, Class {studentClass}
            </Typography>
          )}
        </Grid>
      )}

      {/* 🔹 Edit Dialog */}
      {currentStudent && (
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Name"
              fullWidth
              value={currentStudent.studentName || ""}
              onChange={(e) =>
                setCurrentStudent({ ...currentStudent, studentName: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Roll No"
              fullWidth
              value={currentStudent.studentRollNo || ""}
              onChange={(e) =>
                setCurrentStudent({ ...currentStudent, studentRollNo: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Class"
              fullWidth
              value={currentStudent.studentClass || ""}
              onChange={(e) =>
                setCurrentStudent({ ...currentStudent, studentClass: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Mobile"
              fullWidth
              value={currentStudent.mobileNumber || ""}
              onChange={(e) =>
                setCurrentStudent({ ...currentStudent, mobileNumber: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
