import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EmployeeDetail = ({ employeeId, refreshEmployees, employee }) => {
  const [formData, setFormData] = useState(employee || {});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData(employee); 
    }
  }, [employee]);

  const validate = () => {
    const newErrors = {};
  
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.put(`http://localhost:5000/employees/${employeeId}`, formData);
      toast.success('Employee updated successfully');
      refreshEmployees();
    } catch (error) {
      toast.error('Error updating employee');
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <Typography variant="h6">Edit Employee</Typography>
      <TextField
        name="name"
        label="Name"
        value={formData.name || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="email"
        label="Email"
        value={formData.email || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="employeeId"
        label="Employee ID"
        value={formData.employeeId || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="mobile"
        label="Mobile"
        value={formData.mobile || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="jobRole"
        label="Job Role"
        value={formData.jobRole || ''}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" type="submit">
        Update Employee
      </Button>
    </form>
  );
};

export default EmployeeDetail;
