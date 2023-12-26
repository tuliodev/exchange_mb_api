module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [, 'src/infra/db/typeorm/entities/**/*.ts'],
  migrations: ['src/infra/db/typeorm/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/infra/db/typeorm/migrations',
  },
};
