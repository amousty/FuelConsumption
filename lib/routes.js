'use strict';

const Path = require('path');
const Ticket = require('./controllers/ticket');
const Home = require('./controllers/home');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: Home,
    config: {
      description: 'Gets all the tickets available'
    }
  },
  {
    method: 'POST',
    path: '/ticket',
    handler: Ticket.create,
    config: {
      description: 'Adds a new ticket'
    }
  },
  {
    method: 'GET',
    path: '/ticket/{slug}',
    handler: Ticket.read,
    config: {
      description: 'Gets the content of a ticket'
    }
  },
  {
    method: 'PUT',
    path: '/ticket/{slug}',
    handler: Ticket.update,
    config: {
      description: 'Updates the selected ticket'
    }
  },
  {
    method: 'GET',
    path: '/ticket/{slug}/delete',
    handler: Ticket.delete,
    config: {
      description: 'Deletes the selected ticket'
    }
  },
  {
    // Static files
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: Path.join(__dirname, '../static/public')
      }
    },
    config: {
      description: 'Provides static resources'
    }
  }
];
