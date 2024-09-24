const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

console.log(process.env.ADMIN_PASSWORD);

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware לבדיקת סיסמת מנהל
const checkAdminAuth = (req, res, next) => {
  const password = req.body.password;
  if (!password) return res.status(401).json({ message: 'לא הוכנסה סיסמא' });

  bcrypt.compare(password, process.env.ADMIN_PASSWORD, (err, result) => {
    if (result) next();
    else res.status(401).json({ message: 'הזיהוי נכשל' });
  });
};

// קבלת כל הקבצים
app.get('/files', async (req, res) => {
  try {
    const files = await fs.readdir('./uploads');
    const fileDetails = files.map(file => ({
      name: file,
      firstPage: `/uploads/${file}`,
      description: '' // אפשר לשנות כדי לשמור תיאור
    }));
    res.json(fileDetails);
  } catch (err) {
    console.error('Error reading files:', err);
    res.status(500).json({ error: 'Failed to read files' });
  }
});

// העלאת קובץ
app.post('/upload', checkAdminAuth, (req, res) => {
  let uploadedFile = req.files.pdfFile;
  let uploadPath = path.join(__dirname, 'uploads', uploadedFile.name);

  uploadedFile.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'הקובץ הועלה בהצלחה!' });
  });
});

// מחיקת קובץ
app.delete('/delete', checkAdminAuth, (req, res) => {
  let fileName = req.body.fileName;
  let filePath = path.join(__dirname, 'uploads', fileName);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ message: 'File deleted successfully' });
  } else {
    res.status(404).json({ message: 'File not found' });
  }
});

// הפעלת השרת
app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});
