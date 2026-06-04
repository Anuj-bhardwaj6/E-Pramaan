import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
// removed Paper usage
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import { selectIsAdmin } from "../store/authSlice";
import { Navigate } from "react-router-dom";
import { ref, set, push } from "firebase/database";
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { db, getSecondaryAuth } from "../firebase";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import { clearAdmin, clearUser } from "../store/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function AdminPanel() {
  const isAdmin = useSelector(selectIsAdmin);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("teachers");
  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    employeeId: "",
    password: "",
  });
  const [school, setSchool] = useState({
    schoolId: "",
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
  });
  const [linkEmpId, setLinkEmpId] = useState("");
  const [loading, setLoading] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  function onChange(field, value) {
    setTeacher((t) => ({ ...t, [field]: value }));
  }

  function onSchoolChange(field, value) {
    setSchool((s) => ({ ...s, [field]: value }));
  }

  function openMenu(e) {
    setMenuAnchor(e.currentTarget);
  }

  function closeMenu() {
    setMenuAnchor(null);
  }

  async function handleLogout() {
    try {
      await signOut(auth);
    } finally {
      dispatch(clearUser());
      dispatch(clearAdmin());
      window.location.assign("/login");
    }
  }

  async function handleCreateTeacher(e) {
    e.preventDefault();
    const { email, password, name, phone, department, employeeId } = teacher;
    if (!email || !password || !name) {
      alert("Name, email and password are required");
      return;
    }
    setLoading(true);
    try {
      const secondaryAuth = getSecondaryAuth();
      const cred = await createUserWithEmailAndPassword(secondaryAuth, email, password);
      const uid = cred.user.uid;
      const teacherData = {
        uid,
        name,
        email,
        phone,
        department,
        employeeId,
        createdAt: Date.now(),
        role: "teacher",
      };
      // Save under /Admin/Teachers/{uid}
      await set(ref(db, `Admin/Teachers/${uid}`), teacherData);
      alert("Teacher created successfully");
      setTeacher({ name: "", email: "", phone: "", department: "", employeeId: "", password: "" });
    } catch (err) {
      console.error(err);
      alert(err?.message || "Failed to create teacher");
    } finally {
      setLoading(false);
    }
  }

  async function handleSendReset() {
    if (!teacher.email) {
      alert("Enter a teacher email to send reset");
      return;
    }
    try {
      const secondaryAuth = getSecondaryAuth();
      await sendPasswordResetEmail(secondaryAuth, teacher.email);
      alert("Password reset email sent to teacher");
    } catch (err) {
      console.error(err);
      alert(err?.message || "Failed to send reset email");
    }
  }

  return (
    <Box sx={{ p: 0, display: "flex", minHeight: 560 }}>
      {/* Left navigation */}
      <Box sx={{ width: 264, borderRight: "1px solid #e2e8f0", p: 2.5, bgcolor: "#fafafa" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="h6">Admin</Typography>
          <IconButton size="small" onClick={openMenu}>
            <MoreVertIcon />
          </IconButton>
        </Box>
        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu} keepMounted>
          <MenuItem onClick={() => { closeMenu(); window.location.assign("/"); }}>Go to Site</MenuItem>
          <MenuItem onClick={() => { closeMenu(); handleLogout(); }}>Logout</MenuItem>
        </Menu>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Button variant={activeTab === "teachers" ? "contained" : "text"} onClick={() => setActiveTab("teachers")}>
            Add Teacher
          </Button>
          <Button variant={activeTab === "schools" ? "contained" : "text"} onClick={() => setActiveTab("schools")}>
            Add School
          </Button>
        </Box>
      </Box>

      {/* Right content */}
      <Box sx={{ flex: 1, p: 3 }}>
        {activeTab === "teachers" && (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>Add Teacher</Typography>
            <Box component="form" onSubmit={handleCreateTeacher}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Name" fullWidth value={teacher.name} onChange={(e) => onChange("name", e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Employee ID" fullWidth value={teacher.employeeId} onChange={(e) => onChange("employeeId", e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Email" type="email" fullWidth value={teacher.email} onChange={(e) => onChange("email", e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Phone" fullWidth value={teacher.phone} onChange={(e) => onChange("phone", e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Department" fullWidth value={teacher.department} onChange={(e) => onChange("department", e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Temp Password" type="password" fullWidth value={teacher.password} onChange={(e) => onChange("password", e.target.value)} />
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
                <Button type="submit" variant="contained" disabled={loading}>Create Teacher</Button>
                <Button type="button" variant="outlined" onClick={handleSendReset} disabled={!teacher.email}>Send Reset Email</Button>
              </Box>
            </Box>
          </>
        )}

        {activeTab === "schools" && (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>Add School</Typography>
            <Box component="form" onSubmit={async (e) => {
              e.preventDefault();
              const { schoolId, name, address, city, state, zip, phone, email } = school;
              if (!schoolId || !name) {
                alert("School ID and Name are required");
                return;
              }
              try {
                await set(ref(db, `Admin/Schools/${schoolId}`), {
                  schoolId,
                  name,
                  address,
                  city,
                  state,
                  zip,
                  phone,
                  email,
                  createdAt: Date.now(),
                });
                alert("School saved");
                setSchool({ schoolId: "", name: "", address: "", city: "", state: "", zip: "", phone: "", email: "" });
              } catch (err) {
                alert(err?.message || "Failed to save school");
              }
            }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="School ID" fullWidth value={school.schoolId} onChange={(e) => onSchoolChange("schoolId", e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="School Name" fullWidth value={school.name} onChange={(e) => onSchoolChange("name", e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Address" fullWidth value={school.address} onChange={(e) => onSchoolChange("address", e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField label="City" fullWidth value={school.city} onChange={(e) => onSchoolChange("city", e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField label="State" fullWidth value={school.state} onChange={(e) => onSchoolChange("state", e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField label="ZIP" fullWidth value={school.zip} onChange={(e) => onSchoolChange("zip", e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Phone" fullWidth value={school.phone} onChange={(e) => onSchoolChange("phone", e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Email" type="email" fullWidth value={school.email} onChange={(e) => onSchoolChange("email", e.target.value)} />
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
                <Button type="submit" variant="contained">Save School</Button>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Assign Teacher to School</Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <TextField label="School ID" fullWidth value={school.schoolId} onChange={(e) => onSchoolChange("schoolId", e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Teacher Employee ID" fullWidth value={linkEmpId} onChange={(e) => setLinkEmpId(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button variant="outlined" onClick={async () => {
                  const targetSchoolId = (school.schoolId || "").trim();
                  const empId = (linkEmpId || "").trim();
                  if (!targetSchoolId || !empId) {
                    alert("Enter School ID and Teacher Employee ID");
                    return;
                  }
                  try {
                    // Look up teacher by employeeId under Admin/Teachers
                    // We need to fetch all teachers and match employeeId
                    const res = await fetch(`${import.meta.env.VITE_DATABASE || "https://lpu2hand-default-rtdb.firebaseio.com"}/Admin/Teachers.json`);
                    const data = await res.json();
                    let foundUid = "";
                    if (data) {
                      for (const [uid, t] of Object.entries(data)) {
                        if ((t?.employeeId || "").toString() === empId) {
                          foundUid = uid;
                          break;
                        }
                      }
                    }
                    if (!foundUid) {
                      alert("Teacher not found for that Employee ID");
                      return;
                    }
                    await set(ref(db, `Admin/Schools/${targetSchoolId}/Teachers/${foundUid}`), true);
                    alert("Teacher assigned to school");
                  } catch (err) {
                    alert(err?.message || "Failed to assign teacher");
                  }
                }}>Link Teacher</Button>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </Box>
  );
}


