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
      database: 'my_db',
      user:     'username',
      password: 'password'
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
