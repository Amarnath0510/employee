import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const MainForm = ({ refreshEmployees }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    employeeId: '',
    mobile: '',
    jobRole: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 3 || formData.name.length > 15) {
      newErrors.name = 'Name must be between 3 and 15 characters';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.employeeId.length < 4) {
      newErrors.employeeId = 'Employee ID must be at least 4 characters';
    }
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }
    if (!formData.jobRole) {
      newErrors.jobRole = 'Job Role is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post('http://localhost:5000/employees', formData);
      toast.success('Employee added successfully');
      refreshEmployees();
      setFormData({ name: '', email: '', employeeId: '', mobile: '', jobRole: '' });
    } catch (error) {
      toast.error('Error adding employee');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">Add Employee</Typography>
      <TextField
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        name="employeeId"
        label="Employee ID"
        value={formData.employeeId}
        onChange={handleChange}
        error={!!errors.employeeId}
        helperText={errors.employeeId}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        name="mobile"
        label="Mobile"
        value={formData.mobile}
        onChange={handleChange}
        error={!!errors.mobile}
        helperText={errors.mobile}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        name="jobRole"
        label="Job Role"
        select
        value={formData.jobRole}
        onChange={handleChange}
        error={!!errors.jobRole}
        helperText={errors.jobRole}
        required
        fullWidth
        margin="normal"
      >
        <MenuItem value="Developer">Developer</MenuItem>
        <MenuItem value="Manager">Manager</MenuItem>
        <MenuItem value="Designer">Designer</MenuItem>
      </TextField>
      <Button variant="contained" color="primary" type="submit">
        Add Employee
      </Button>
    </form>
  );
};

export default MainForm;
