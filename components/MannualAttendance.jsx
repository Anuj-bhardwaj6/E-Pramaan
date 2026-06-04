// src/pages/MannualAttendance.jsx
import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { ref, onValue, set } from "firebase/database";
import { db } from "../firebase"; // your firebase.js config
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function MannualAttendance() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState({});
  const [selectedClass, setSelectedClass] = useState("1st");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );
  const [date, setDate] = useState(new Date().getDate().toString());

  // 🔹 Fixed Classes 1st–12th
  const allClasses = [
    "1st", "2nd", "3rd", "4th", "5th", "6th",
    "7th", "8th", "9th", "10th", "11th", "12th",
  ];

  // 🔹 Fetch Students from StudentsInfo/{year}/{selectedClass}
  useEffect(() => {
    if (!year || !selectedClass) return;

    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://lpu2hand-default-rtdb.firebaseio.com/StudentsInfo/${year}/${selectedClass}.json`
        );
        const data = await res.json();

        if (!data) {
          setStudents([]);
          setLoading(false);
          return;
        }

        const loadedStudents = [];
        for (const studentName in data) {
          loadedStudents.push({
            id: `${selectedClass}-${studentName}`,
            studentName,
            className: selectedClass,
            year,
            ...data[studentName],
          });
        }

        setStudents(loadedStudents);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching StudentsInfo:", err);
        setLoading(false);
      }
    };

    fetchStudents();
  }, [year, selectedClass]);

  // 🔹 Listen to StudentDetails for existing attendance
  useEffect(() => {
    if (!selectedClass || !year || !month || !date) return;

    const detailsRef = ref(
      db,
      `StudentDetails/${selectedClass}/${year}/${month}/${date}`
    );

    onValue(detailsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const updatedAttendance = {};
        for (const studentName in data) {
          updatedAttendance[
            `${studentName}-${selectedClass}-${year}-${month}-${date}`
          ] = data[studentName].Status === "Present";
        }
        setAttendance(updatedAttendance);
      }
    });
  }, [selectedClass, year, month, date]);

  // 🔹 Toggle attendance
  const handleAttendanceChange = (student) => {
    const key = `${student.studentName}-${student.className}-${year}-${month}-${date}`;
    const newStatus = !(attendance[key] || false);

    const studentRef = ref(
      db,
      `StudentDetails/${student.className}/${year}/${month}/${date}/${student.studentName}`
    );
    set(studentRef, { Status: newStatus ? "Present" : "Absent" });
  };

  // 🔹 Export to Excel
  const exportToExcel = () => {
    const exportData = students.map((student, index) => {
      const key = `${student.studentName}-${student.className}-${year}-${month}-${date}`;
      return {
        "Sr. No.": index + 1,
        "Student Name": student.studentName,
        Class: student.className,
        Date: `${date}-${month}-${year}`,
        Status: attendance[key] ? "Present" : "Absent",
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(data, `Attendance_${selectedClass}_${date}_${month}_${year}.xlsx`);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      minHeight="100vh"
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        p: 3,
      }}
    >
      <Typography variant="h3" fontWeight="bold" mb={2}>
        Manual Attendance - Student List
      </Typography>

      {/* Filters */}
      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        {/* Class */}
        <FormControl sx={{ minWidth: 150, background: "white", borderRadius: 1 }}>
          <InputLabel>Class</InputLabel>
          <Select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            {allClasses.map((cls) => (
              <MenuItem key={cls} value={cls}>
                {cls}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Year */}
        <FormControl sx={{ minWidth: 120, background: "white", borderRadius: 1 }}>
          <InputLabel>Year</InputLabel>
          <Select value={year} onChange={(e) => setYear(e.target.value)}>
            <MenuItem value="2024">2024</MenuItem>
            <MenuItem value="2025">2025</MenuItem>
          </Select>
        </FormControl>

        {/* Month */}
        <FormControl sx={{ minWidth: 150, background: "white", borderRadius: 1 }}>
          <InputLabel>Month</InputLabel>
          <Select value={month} onChange={(e) => setMonth(e.target.value)}>
            {[
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December",
            ].map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Date */}
        <FormControl sx={{ minWidth: 120, background: "white", borderRadius: 1 }}>
          <InputLabel>Date</InputLabel>
          <Select value={date} onChange={(e) => setDate(e.target.value)}>
            {[...Array(31)].map((_, i) => (
              <MenuItem key={i + 1} value={`${i + 1}`}>
                {i + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Export Button */}
        <Button
          variant="contained"
          color="success"
          onClick={exportToExcel}
          sx={{ fontWeight: "bold" }}
        >
          Export Excel
        </Button>
      </Box>

      {loading ? (
        <CircularProgress color="inherit" />
      ) : (
        <Box
          sx={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            width: "100%",
            maxWidth: "900px",
            overflow: "hidden",
            borderRadius: 2,
          }}
        >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ background: "rgba(0,0,0,0.3)", color: "white" }}>
                    Sr. No.
                  </TableCell>
                  <TableCell sx={{ background: "rgba(0,0,0,0.3)", color: "white" }}>
                    Student Name
                  </TableCell>
                  <TableCell sx={{ background: "rgba(0,0,0,0.3)", color: "white" }}>
                    Class
                  </TableCell>
                  <TableCell sx={{ background: "rgba(0,0,0,0.3)", color: "white" }}>
                    Date
                  </TableCell>
                  <TableCell sx={{ background: "rgba(0,0,0,0.3)", color: "white" }}>
                    Mark Attendance
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student, index) => {
                  const key = `${student.studentName}-${student.className}-${year}-${month}-${date}`;
                  return (
                    <TableRow key={student.id}>
                      <TableCell sx={{ color: "white" }}>{index + 1}</TableCell>
                      <TableCell sx={{ color: "white" }}>{student.studentName}</TableCell>
                      <TableCell sx={{ color: "white" }}>{student.className}</TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {date}-{month}-{year}
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>
                        <Switch
                          checked={attendance[key] || false}
                          onChange={() => handleAttendanceChange(student)}
                          color="success"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}
