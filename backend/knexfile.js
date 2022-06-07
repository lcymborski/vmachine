const path = require("path");
const config = require("./config");

const getConfig = (configObj, migrationsFolderName = "migrations") => ({
  client: configObj.client,
  connection:
    configObj.client === "sqlite3"
      ? {
          filename: path.join(__dirname, configObj.filename),
        }
      : {
          host: configObj.host,
          ...(configObj.port ? { port: configObj.port } : {}),
          database: configObj.name,
          user: configObj.user,
          password: configObj.password,
          ...(configObj.client === "mssql"
            ? {
                options: {
                  enableArithAbort: true,
                  useUTC: false,
                },
              }
            : {}),
        },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: `${configObj.tablePrefix}knex_migrations`,
    directory: path.join(__dirname, `/db/${migrationsFolderName}`),
    ...(configObj.client === "mssql" ? { disableTransactions: true } : {}),
  },
  useNullAsDefault: configObj.client === "sqlite3",
});

module.exports = {
  app: getConfig(config.db),
  test: { ...getConfig(config.db), connection: ":memory:" },
};
