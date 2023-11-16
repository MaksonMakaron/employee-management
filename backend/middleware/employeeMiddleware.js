const employeeService = require('../services/employeeService.js');
const positionService = require('../services/positionService.js');

const validateEmployee = async (req, res, next) => {
  const { lastName, firstName, patronymic, idPost, dateOfEmployment } = req.body.employee;

  if (!lastName || !firstName || !idPost || !dateOfEmployment) {
    return res.status(400).json({ error: 'Все поля должны быть заполнены' });
  }

  const nameFields = [lastName, firstName, patronymic];
  const hasDigits = nameFields.some((name) => /\d/.test(name));
  if (hasDigits) {
    return res.status(400).json({ error: 'ФИО не должно содержать цифры' });
  }

  const today = new Date();
  const providedDate = new Date(dateOfEmployment);

  if (isNaN(providedDate.getTime())) {
    return res.status(400).json({ error: 'Неверный формат даты' });
  }

  const oneWeekLater = new Date(today);
  oneWeekLater.setDate(oneWeekLater.getDate() + 7);

  if (providedDate > oneWeekLater) {
    return res.status(400).json({ error: 'Дата не может быть больше недели с текущей даты' });
  }

  const isExist = await positionService.isExistPosition(idPost);

  if (!isExist.success) {
    return res.status(404).json({ error: isExist.message });
  }

  next();
};

const validateIDEmployee = async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: 'Не указан идентификатор сотрудника' });
  }
  const employeeId = req.params.id;
  const isExist = await employeeService.isExistEmployee(employeeId);

  if (!isExist.success) {
    return res.status(404).json({ error: isExist.message });
  }
  next();
};

module.exports = { validateEmployee, validateIDEmployee };
