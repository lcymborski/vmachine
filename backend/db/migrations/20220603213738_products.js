const utils = require('../utils');

const t = utils.getPrefixed;

exports.up = knex =>
  knex.schema.createTable(t('products'), (table) => {
    table.comment('available products');
    table.increments('id').primary().comment('user id');
    table.string('name').notNullable().comment('product name');
    table.integer('amount').notNullable().comment('amount available');
    table.integer('cost').notNullable().comment('product cost');
    table.integer('seller_id').references('id').inTable(t('users')).index()
      .comment('id of the seller who created the product');
  });

exports.down = knex => knex.schema.dropTable(t('products'));
