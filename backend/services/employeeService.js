const Employee = require('../models/employeeModel.js');

const getAllEmployees = async () => {
  try {
    const employees = await Employee.findAll();
    return employees;
  } catch (error) {
    console.error('Ошибка загрузки сотрудников:', error);
    throw error;
  }
};

const addEmployee = async (newEmployeeData) => {
  try {
    const newEmployee = await Employee.create(newEmployeeData);
    return newEmployee;
  } catch (error) {
    console.error('Ошибка добавления сотрудника:', error);
    throw error;
  }
};

const updateEmployee = async (employeeId, updatedEmployeeData) => {
  try {
    const [updatedRowsCount, [updatedEmployee]] = await Employee.update(updatedEmployeeData, {
      where: { id: employeeId },
      returning: true,
    });

    if (updatedRowsCount > 0) {
      return updatedEmployee;
    } else {
      throw new Error('Ошибка: работник не найден или не обновлен');
    }
  } catch (error) {
    console.error('Ошибка обновления сотрудника:', error);
    throw error;
  }
};

const deleteEmployee = async (employeeId) => {
  try {
    const deletedRowsCount = await Employee.destroy({
      where: { id: employeeId },
    });

    if (deletedRowsCount > 0) {
      return { success: true, message: 'Сотрудник удален' };
    } else {
      throw new Error('Ошибка: работник не найден или не удален');
    }
  } catch (error) {
    console.error('Ошибка удаления сотрудника:', error);
    throw error;
  }
};

const isExistEmployee = async (employeeId) => {
  try {
    const findingEmployee = await Employee.findOne({
      where: { id: employeeId },
    });
    if (findingEmployee) {
      return { success: true };
    } else {
      return { success: false, message: 'Сотрудник с таким ID не найден :(' };
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

module.exports = {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  isExistEmployee,
};
