import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import EmployeeDetail from './Details';
import EmployeeList from './List';
import MainForm from './MainForm';
import { Container } from '@mui/material';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);


  const refreshEmployees = async () => {
    const response = await axios.get('http://localhost:5000/employees');
    setEmployees(response.data);
  };

  useEffect(() => {
    refreshEmployees();
  }, []);

 
  const handleEdit = (employee) => {
    setSelectedEmployeeId(employee.id); 
    setSelectedEmployee(employee); 
  };

  return (
    <Container>
      <ToastContainer />
      <MainForm refreshEmployees={refreshEmployees} />

      <EmployeeList 
        employees={employees} 
        setSelectedEmployee={handleEdit} 
        refreshEmployees={refreshEmployees} 
      />
      {selectedEmployeeId && selectedEmployee && ( 
        <EmployeeDetail
          employeeId={selectedEmployeeId}
          refreshEmployees={refreshEmployees}
          employee={selectedEmployee} 
        />
      )}
    </Container>
  );
};

export default App;
