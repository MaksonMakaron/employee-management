const { DataTypes } = require('sequelize');
const sequelize = require('../config.database.js');

const Position = sequelize.define(
  'positions',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    raw: true,
  }
);

Position.addHook('beforeFind', (options) => {
  if (!options.raw) {
    options.raw = true;
  }
});

module.exports = Position;
