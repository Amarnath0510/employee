import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeList = ({ refreshEmployees, setSelectedEmployee }) => {
  const [employees, setEmployees] = useState([]);

 
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/employees');
      setEmployees(response.data);
    } catch (error) {
      toast.error('Error fetching employees');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [refreshEmployees]);


  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://localhost:5000/employees/${id}`);
        toast.success('Employee deleted successfully');
  
        // Update the state by filtering out the deleted employee locally
        setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
        // refreshEmployees()
        
      } catch (error) {
        toast.error('Error deleting employee');
      }
    }
  };
  

  return (
    <div>
      <Typography variant="h6">Employee List</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Job Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.employeeId}</TableCell>
                <TableCell>{employee.mobile}</TableCell>
                <TableCell>{employee.jobRole}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleEdit(employee)} 
                    style={{ marginRight: '8px' }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EmployeeList;

