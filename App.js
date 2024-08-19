import logo from './logo.svg';
import './App.css';
import EmployeeForm from './components/EmployeeForm';
import React, { useState, useEffect } from 'react';

function App() {
  
  const [employees, setEmployees] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    jobTitle: '',
    department: ''
  });

  
  useEffect(() => {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    }
  }, []);

  
  const addEmployee = () => {
    
    if (formData.name && formData.email && formData.jobTitle && formData.department) {
      const newEmployees = [...employees, formData];
      
      setEmployees(newEmployees);
      
      localStorage.setItem('employees', JSON.stringify(newEmployees));
      
      setFormData({ name: '', email: '', jobTitle: '', department: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

  
  const saveData = () => {
    
    localStorage.setItem('employees', JSON.stringify(employees));
    alert('Data saved to local storage!');
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="App">
      <h1>Employee Management</h1>
      
      <div>
        <input 
          type="text"
          name="name"
          placeholder="Employee Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input 
          type="email"
          name="email"
          placeholder="Employee Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input 
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={formData.jobTitle}
          onChange={handleInputChange}
        />
        <input 
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleInputChange}
        />
        <button onClick={addEmployee}>Add Employee</button>
      </div>

      <div>
        <h2>Employee List</h2>
        <ul>
          {employees.map((employee, index) => (
            <li key={index}>
              {employee.name} - {employee.email} - {employee.jobTitle} - {employee.department}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={saveData}>Save Data</button>
    </div>
  );
}

function EmployeeList(props) {
// Render the employee list
return (
<div className="employee-list">
<h1>Employee List</h1>
<ul>
{props.employees.map((employee) => (
<li key={employee.EmployeeId}>
{/* Create a link to the employee detail page */}
<Link to={`/employees/${employee.EmployeeId}`}>
{employee.name}
</Link>
</li>
))}
</ul>
</div>
);
}

export default App;
