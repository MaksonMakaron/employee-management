const express = require('express');
const api = express.Router();
const employeeService = require('../services/employeeService.js');
const { validateEmployee, validateIDEmployee } = require('../middleware/employeeMiddleware.js');

api.get('/api/employees', async (req, res) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error in /api/employees:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

api.post('/api/employees', validateEmployee, async (req, res) => {
  const newEmployeeData = req.body.employee;
  try {
    const newEmployee = await employeeService.addEmployee(newEmployeeData);
    res.status(200).json(newEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

api.put('/api/employees/:id?', [validateIDEmployee, validateEmployee], async (req, res) => {
  const employeeId = req.params.id;
  const updatedEmployeeData = req.body.employee;
  try {
    const updatedEmployee = await employeeService.updateEmployee(employeeId, updatedEmployeeData);
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

api.delete('/api/employees/:id?', validateIDEmployee, async (req, res) => {
  const employeeId = req.params.id;
  try {
    const result = await employeeService.deleteEmployee(employeeId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = api;
