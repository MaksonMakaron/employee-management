const Position = require('../models/positionModel.js');

const getAllPositions = async () => {
  try {
    const positions = await Position.findAll();
    return positions;
  } catch (error) {
    console.error('Ошибка при загрузке должностей:', error);
    throw error;
  }
};

const addPosition = async (newPositionData) => {
  try {
    const newPosition = await Position.create(newPositionData);
    return newPosition;
  } catch (error) {
    console.error('Ошибка добавления должности:', error);
    throw error;
  }
};

const updatePosition = async (positionId, updatedPositionData) => {
  try {
    const updatedRowsCount = await Position.update(updatedPositionData, {
      where: { id: positionId },
    });

    if (updatedRowsCount > 0) {
      const updatedPosition = await Position.findByPk(positionId);
      return updatedPosition;
    } else {
      throw new Error('Ошибка: не найдена должность или не обновлена');
    }
  } catch (error) {
    console.error('Ошибка обновления должности:', error);
    throw error;
  }
};

const deletePosition = async (positionId) => {
  try {
    const deletedRowsCount = await Position.destroy({
      where: { id: positionId },
    });

    if (deletedRowsCount > 0) {
      return { success: true, message: 'Должность была удалена' };
    } else {
      throw new Error('Ошибка: не найдена должность или не удалена');
    }
  } catch (error) {
    console.error('Ошибка удаления должности:', error);
    throw error;
  }
};

const isExistPosition = async (positionId) => {
  try {
    const findingPosition = await Position.findOne({
      where: { id: positionId },
    });
    return { success: !!findingPosition, message: findingPosition ? '' : 'Данная должность с таким ID не найдена :(' };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

module.exports = {
  getAllPositions,
  addPosition,
  updatePosition,
  deletePosition,
  isExistPosition,
};
