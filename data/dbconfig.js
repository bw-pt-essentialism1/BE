const knex = require('knex');

const knexConfig = require('../knexfile.js');

const dbEnv = process.env.NODE_ENV || 'development';

knex(knexConfig[dbEnv]);

module.exports = knex(knexConfig[dbEnv]);