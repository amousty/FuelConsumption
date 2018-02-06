'use strict';

const Moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  let Ticket = sequelize.define('Ticket', {
    date: {
      type: DataTypes.DATE,
      get: function () {
        return Moment(this.getDataValue('date')).format('MMMM Do, YYYY');
      }
    },
    car: DataTypes.STRING,
    licencePlate: DataTypes.STRING,
    stationName: DataTypes.STRING,
    fuelType : DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.FLOAT
  });

  return Ticket;
};
