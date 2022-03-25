const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  const hashValue = bcrypt.hashSync(password, 6);
  return hashValue;
};

const comparePassword = (password, hash) => {
  const correct = bcrypt.compareSync(password, hash);
  return correct;
};

module.exports = {
  hashPassword,
  comparePassword,
};
