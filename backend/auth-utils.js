// auth-utils.js
const bcrypt = require('bcryptjs');

// גיבוב סיסמה (ליצירת קוד להצבה ב-.env)
async function hashPassword(plainPassword) {
  const saltRounds = 10;
  return await bcrypt.hash(plainPassword, saltRounds);
}

// בדיקת סיסמה מול גיבוב
function comparePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {
  hashPassword,
  comparePassword
};
