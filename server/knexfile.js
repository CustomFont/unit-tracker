// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: "pg",
    connection: "postgres://postgres:docker@142.93.182.171:5432/unit_tracker",
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: "pg",
    connection: {
      host: "142.93.182.171",
      port: 5432,
      database: "unit_tracker",
      user: "postgres",
      password: "docker",
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
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
