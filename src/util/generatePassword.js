const bcrypt = require('bcrypt');

const generatePassword = async (password) => {
  return await new Promise((res, rej) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) rej(err);
      res(hash);
    });
  });

};

module.exports = { generatePassword };