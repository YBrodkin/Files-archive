const bcrypt = require('bcryptjs');

const password = '12345';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`The hashed password is: ${hash}`);
});
