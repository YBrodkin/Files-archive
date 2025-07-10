// create-hash.js
const { hashPassword } = require('./auth-utils');

const plainPassword = '12345';

hashPassword(plainPassword).then(hash => {
  console.log(' להעתיק לקובץ .env:');
  console.log(`ADMIN_PASSWORD=${hash}`);
});

