const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;
const BASE_URL = `http://${HOST}:${PORT}`;
const LOCAL_URL = `http://127.0.0.1:${PORT}`;

module.exports = {
  HOST,
  PORT,
  BASE_URL,
  LOCAL_URL,
};
