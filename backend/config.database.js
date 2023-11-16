const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'employee_management',
  username: 'postgres',
  password: '0000',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  // logging: false,
});

module.exports = sequelize;
