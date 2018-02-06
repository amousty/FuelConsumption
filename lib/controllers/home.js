'use strict';

const Models = require('../models/');

module.exports = (request, reply) => {
  Models.Ticket
    .findAll({
      order: [['date', 'DESC']]
    })
    .then((result) => {
      reply.view('home', {
        data: {
          tickets: result
        },
        page: 'My consumption',
        description: 'My tickets'
      });
    });
};
