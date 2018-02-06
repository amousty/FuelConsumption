'use strict';

const Models = require('../models/');
const Slugify = require('slug');
const Pug = require('pug');
const Path = require('path');

module.exports = {
  create: (request, reply) => {
    Models.Ticket
      .create({
        //slug: Slugify(request.payload.ticketTitle, {lower: true}),
        date: request.payload.ticketDate,
        car:request.payload.ticketCar,
        licencePlate: request.payload.ticketLicencePlate,
        stationName: request.payload.ticketStationName,
        fuelType : request.payload.ticketFuelType,
        price: request.payload.ticketPrice,
        quantity: request.payload.ticketQuantity
      })
      .then((result) => {
        // Generate a new ticket with the 'result' data
        const newTicket = Pug.renderFile(
          Path.join(__dirname, '../views/components/ticket.pug'),
          {
            ticket: result
          }
        );

        reply(newTicket);
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
