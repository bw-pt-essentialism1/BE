// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'stateradio',
      database : 'essentialism'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: "./data/seeds"
    }
  },
  production: {
    client: 'mysql2',
    connection: {
      host: "us-cdbr-iron-east-04.cleardb.net",
      database: 'heroku_8f29e2d6d8b5b58',
      user:     'b16b5e6c019995',
      password: '88dca0bb'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
