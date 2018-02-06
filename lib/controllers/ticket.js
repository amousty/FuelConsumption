'use strict';

const Models = require('../models/');
const Slugify = require('slug');
const Pug = require('pug');
const Path = require('path');

module.exports = {
  create: (request, reply) => {
    // Create the ticket
    Models.Ticket
      .create({
        //slug: Slugify(request.payload.ticketTitle, {lower: true}),
        date: Date.now(),//request.payload.inputDate,
        car:request.payload.inputCar,
        licencePlate: request.payload.inputLicencePlate,
        stationName: request.payload.inputStationName,
        fuelType : request.payload.inputFuelType,
        price: request.payload.inputPrice,
        quantity: request.payload.inputQuantity
      });
      /*.then((result) => {
        // Generate a new ticket with the 'result' data
        const newTicket = Pug.renderFile(
          Path.join(__dirname, '../views/home.pug'),
          {
            ticket: result
          }
        );

        reply(newTicket);
      });*/
      // Display whole tickets
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
  },
  read: (request, reply) => {
    Models.Ticket
      .findOne({
        where: {
          slug: request.params.slug
        }
      })
      .then((result) => {
        reply.view('ticket', {
          ticket: result,
          page: `${result.title}—Tickets Board`,
          description: result.description
        });
      });
  },
  update: (request, reply) => {
    const values = {
      title: request.payload.ticketTitle,
      description: request.payload.ticketDescription,
      content: request.payload.ticketContent
    };

    const options = {
      where: {
        slug: request.params.slug
      }
    };

    Models.Ticket
      .update(values, options)
      .then(() => {
        Models.Ticket
          .findOne(options)
          .then((result) => {
            // Generate a new ticket with the updated data
            const updatedTicket = Pug.renderFile(
              Path.join(__dirname, '../views/components/ticket.pug'),
              {
                ticket: result
              }
            );

            reply(updatedTicket);
          });
      });
  },
  delete: (request, reply) => {
    Models.Ticket
      .destroy({
        where: {
          slug: request.params.slug
        }
      })
      .then(() => reply.redirect('/'));
  }
};
