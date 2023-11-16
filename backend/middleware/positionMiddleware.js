const positionService = require('../services/positionService');
const Employee = require('../models/employeeModel.js');

const validatePosition = async (req, res, next) => {
  const name = req.body.position.name;

  if (!name) {
    return res.status(400).json({ error: 'Введите имя должности' });
  }

  next();
};

const validateIDPosition = async (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: 'Не указан идентификатор должности' });
  }
  const positionId = req.params.id;
  const isExist = await positionService.isExistPosition(positionId);

  if (!isExist.success) {
    return res.status(404).json({ error: isExist.message });
  }
  if (req.method === 'DELETE') {
    const employeesWithPosition = await Employee.findOne({
      where: { idPost: positionId },
    });

    if (employeesWithPosition) {
      return res.status(409).json({ error: 'Ошибка: не удалено, так как существуют сотрудники с этой должностью' });
    }
  }

  next();
};

module.exports = { validatePosition, validateIDPosition };
