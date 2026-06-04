import React, { useState } from 'react';
import {
  Typography, Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, Grid, Avatar,
  Stepper, Step, StepLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2';

const classes = ['PG', 'Nursery', 'LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
const genders = ['Male', 'Female', 'Other'];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const religions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Other'];
const categories = ['General', 'OBC', 'SC', 'ST', 'EWS'];
const steps = ['Personal Details', 'Parent Details', 'Academic & Address'];

// Cloudinary config
const CLOUD_NAME = "dm23icoaz";
const UPLOAD_PRESET = "ml_default";

const StyledTextField = styled(TextField)({
  '& label.Mui-focused': { color: 'white' },
  '& .MuiInput-underline:after': { borderBottomColor: 'white' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.7)' },
    '&:hover fieldset': { borderColor: 'white' },
    '&.Mui-focused fieldset': { borderColor: 'white' },
    '& input': { color: 'white' },
  },
  '& label': { color: 'rgba(255, 255, 255, 0.7)' },
});

const StyledFormControl = styled(FormControl)({
  '& label': { color: 'rgba(255, 255, 255, 0.7)' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.7)' },
    '&:hover fieldset': { borderColor: 'white' },
    '&.Mui-focused fieldset': { borderColor: 'white' },
    '& .MuiSelect-select': { color: 'white' },
    '& .MuiSvgIcon-root': { color: 'white' },
  },
});

function getStepContent(step, formData, handleChange, handlePhotoChange, photoPreview, errors) {
  switch (step) {
    case 0:
      return (
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} container justifyContent="center" mb={3}>
            <Box textAlign="center">
              <Avatar src={photoPreview} sx={{ width: 150, height: 150, mb: 2, mx: 'auto', border: '4px solid white' }} />
              <Button variant="contained" component="label" sx={{ background: 'white', color: '#667eea', '&:hover': { background: '#f0f0f0' } }}>
                Upload Photo
                <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField fullWidth label="Student Name" name="studentName" value={formData.studentName}
              onChange={handleChange} required error={!!errors.studentName} helperText={errors.studentName} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField fullWidth label="Date of Birth" name="dob" type="date" value={formData.dob}
              onChange={handleChange} required InputLabelProps={{ shrink: true }} error={!!errors.dob} helperText={errors.dob} />
          </Grid>
          <Grid item>
            <Box sx={{ width: 250 }}>
              <StyledFormControl fullWidth required error={!!errors.gender}>
                <InputLabel>Gender</InputLabel>
                <Select name="gender" value={formData.gender} onChange={handleChange}>
                  {genders.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
                </Select>
              </StyledFormControl>
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ width: 250 }}>
              <StyledFormControl fullWidth>
                <InputLabel>Blood Group</InputLabel>
                <Select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                  {bloodGroups.map(bg => <MenuItem key={bg} value={bg}>{bg}</MenuItem>)}
                </Select>
              </StyledFormControl>
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ width: 250 }}>
              <StyledFormControl fullWidth>
                <InputLabel>Religion</InputLabel>
                <Select name="religion" value={formData.religion} onChange={handleChange}>
                  {religions.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                </Select>
              </StyledFormControl>
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ width: 250 }}>
              <StyledFormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select name="category" value={formData.category} onChange={handleChange}>
                  {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </Select>
              </StyledFormControl>
            </Box>
          </Grid>
        </Grid>
      );
    case 1:
      return (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <StyledTextField fullWidth label="Father's Name" name="fatherName" value={formData.fatherName}
              onChange={handleChange} required error={!!errors.fatherName} helperText={errors.fatherName} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField fullWidth label="Mother's Name" name="motherName" value={formData.motherName}
              onChange={handleChange} required error={!!errors.motherName} helperText={errors.motherName} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField fullWidth label="Father's Occupation" name="fatherOccupation" value={formData.fatherOccupation}
              onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField fullWidth label="Mother's Occupation" name="motherOccupation" value={formData.motherOccupation}
              onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField fullWidth label="Mobile Number" name="mobileNumber" value={formData.mobileNumber}
              onChange={handleChange} required error={!!errors.mobileNumber} helperText={errors.mobileNumber} />
          </Grid>
        </Grid>
      );
    case 2:
      return (
        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <Box sx={{ width: 250 }}>
              <StyledFormControl fullWidth required error={!!errors.studentClass}>
                <InputLabel>Class</InputLabel>
                <Select name="studentClass" value={formData.studentClass} onChange={handleChange}>
                  {classes.map(cls => <MenuItem key={cls} value={cls}>{cls}</MenuItem>)}
                </Select>
              </StyledFormControl>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField fullWidth label="Aadhar Number" name="aadharNumber" value={formData.aadharNumber}
              onChange={handleChange} required error={!!errors.aadharNumber} helperText={errors.aadharNumber} />
          </Grid>
          <Grid item xs={12}>
            <StyledTextField fullWidth label="Address" name="address" value={formData.address}
              onChange={handleChange} required multiline rows={4} error={!!errors.address} helperText={errors.address} />
          </Grid>
        </Grid>
      );
    default:
      return 'Unknown step';
  }
}

export default function AddStudents() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    studentName: '', fatherName: '', motherName: '', mobileNumber: '', aadharNumber: '', address: '', studentClass: '',
    dob: '', gender: '', bloodGroup: '', religion: '', category: '', fatherOccupation: '', motherOccupation: '', photo: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, photo: file }));
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const validate = (step) => {
    let tempErrors = {};
    if (step === 0) {
      if (!formData.studentName) tempErrors.studentName = "Student name is required.";
      if (!formData.dob) tempErrors.dob = "Date of birth is required.";
      if (!formData.gender) tempErrors.gender = "Gender is required.";
    } else if (step === 1) {
      if (!formData.fatherName) tempErrors.fatherName = "Father's name is required.";
      if (!formData.motherName) tempErrors.motherName = "Mother's name is required.";
      if (!formData.mobileNumber) tempErrors.mobileNumber = "Mobile number is required.";
      else if (!/^\d{10}$/.test(formData.mobileNumber)) tempErrors.mobileNumber = "Mobile number must be 10 digits.";
    } else if (step === 2) {
      if (!formData.studentClass) tempErrors.studentClass = "Class is required.";
      if (!formData.aadharNumber) tempErrors.aadharNumber = "Aadhar number is required.";
      else if (!/^\d{12}$/.test(formData.aadharNumber)) tempErrors.aadharNumber = "Aadhar number must be 12 digits.";
      if (!formData.address) tempErrors.address = "Address is required.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = () => {
    if (validate(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);
    data.append("cloud_name", CLOUD_NAME);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    return result.secure_url; // return uploaded image URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate(0) && validate(1) && validate(2)) {
      try {
        let photoURL = "";
        if (formData.photo) {
          photoURL = await uploadToCloudinary(formData.photo);
        }

        const now = new Date();
        const year = now.getFullYear();

        const dataToSave = { ...formData, photo: photoURL };

        const response = await fetch(
          `https://lpu2hand-default-rtdb.firebaseio.com/StudentsInfo/${year}/${formData.studentClass}.json`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSave),
          }
        );

        if (response.ok) {
          Swal.fire('Success!', 'Student details submitted successfully.', 'success');
          setFormData({
            studentName: '', fatherName: '', motherName: '', mobileNumber: '', aadharNumber: '', address: '', studentClass: '',
            dob: '', gender: '', bloodGroup: '', religion: '', category: '', fatherOccupation: '', motherOccupation: '', photo: null,
          });
          setPhotoPreview(null);
          setActiveStep(0);
        } else {
          throw new Error('Failed to submit data.');
        }
      } catch (error) {
        Swal.fire('Error!', error.message, 'error');
      }
    } else {
      Swal.fire('Error!', 'Please fill all the required fields correctly.', 'error');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%" minHeight="100vh"
      sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', p: 3 }}>
      <Box component="form" onSubmit={handleSubmit}
        sx={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', p: 4, borderRadius: 4, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', width: '100%', maxWidth: '800px' }}>
        <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">Add Student Details</Typography>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4, '.MuiStepLabel-label': { color: 'white' } }}>
          {steps.map((label) => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
        </Stepper>
        {getStepContent(activeStep, formData, handleChange, handlePhotoChange, photoPreview, errors)}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          {activeStep !== 0 && <Button onClick={handleBack} sx={{ mr: 1, color: 'white' }}>Back</Button>}
          <Button variant="contained"
            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
            sx={{ background: 'white', color: '#667eea', fontWeight: 'bold', '&:hover': { background: '#f0f0f0' } }}>
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
