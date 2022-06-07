const utils = require('../utils');

const t = utils.getPrefixed;

exports.up = knex =>
  knex.schema.createTable(t('users'), (table) => {
    table.comment('user accounts');
    table.increments('id').primary().comment('user id');
    table.string('username').notNullable().comment('username / login');
    table.string('password').notNullable().comment('user password');
    table.integer('role').notNullable().index().comment('user role id (1 - seller, 2 - buyer)');
    table.integer('deposit').notNullable().default(0).comment('deposited money');
  });

exports.down = knex => knex.schema.dropTable(t('users'));
