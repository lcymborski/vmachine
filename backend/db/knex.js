const { app, test } = require("../knexfile.js");

const knex = require("knex")(process.env.NODE_ENV === "test" ? test : app);

module.exports = knex;
