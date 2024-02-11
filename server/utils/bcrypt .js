const bcrypt = require("bcrypt");

const generatePasswordHash = (password) => {
  return bcrypt.hash(password, 10);
};

const checkePasswordHash = (password, passwordHash) => {
  return bcrypt.compare(password, passwordHash);
};

module.exports = {
  generatePasswordHash,
  checkePasswordHash,
};
