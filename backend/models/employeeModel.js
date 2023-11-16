const { DataTypes } = require('sequelize');
const sequelize = require('../config.database.js');

const Employee = sequelize.define(
  'employees',
  {
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    patronymic: {
      type: DataTypes.STRING,
    },
    idPost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dateOfEmployment: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    raw: true,
  }
);

Employee.addHook('beforeFind', (options) => {
  if (!options.raw) {
    options.raw = true;
  }
});

module.exports = Employee;
