const path = require('path');

const envFound = require('dotenv').config({ path: path.join(__dirname, '.env') });
if (!envFound) {
  console.error('No .env file found.');
  process.exit(0);
}

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  isProduction,
  server: {
    port: process.env.VM_SERVER_PORT,
  },
  secret: process.env.VM_SECRET,
  db: {
    client: process.env.VM_DB_CLIENT,
    host: process.env.VM_DB_HOST,
    port: parseInt(process.env.VM_DB_PORT || '0', 10),
    name: process.env.VM_DB_NAME,
    user: process.env.VM_DB_USER,
    password: process.env.VM_DB_PASSWORD,
    filename: process.env.VM_DB_FILENAME,
    tablePrefix: process.env.VM_DB_TABLE_PREFIX,
  },
};
