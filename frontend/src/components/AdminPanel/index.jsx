import React, { useState } from 'react';
import styles from './style.module.css';

const AdminPanel = () => {
  const [password, setPassword] = useState('');
  const [pdfFile, setPdfFile] = useState(null);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('pdfFile', pdfFile);
    formData.append('password', password);

    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(data => alert(data.message))
      .catch(err => alert('Error uploading file'));
  };

  return (
    <div className={styles.adminPanel}>
      <h2>ניהול המערכת</h2>
      <input
        type="password"
        placeholder="הכנס סיסמת ניהול"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <input
        type="file"
        accept="application/pdf"
        onChange={e => setPdfFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>PDF העלה קובץ</button>
    </div>
  );
};

export default AdminPanel;
