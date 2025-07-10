// /src/components/AdminPanel/index.jsx
import { useState } from 'react';
import styles from './style.module.css';

const AdminPanel = () => {
  const [password, setPassword] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if (!pdfFile || !password) {
      setError('יש להזין סיסמה ולבחור קובץ PDF');
      return;
    }

    const formData = new FormData();
    formData.append('pdfFile', pdfFile);
    formData.append('password', password);

    try {
      const res = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setError('');
        setPassword('');
        setPdfFile(null);
      } else {
        setError(data.message || 'שגיאה בהעלאת הקובץ');
      }
    } catch (err) {
      setError('שגיאת רשת או שגיאה כללית');
    }
  };

  return (
    <div className={styles.main}>
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

      <button onClick={handleUpload}>העלה קובץ PDF</button>

      {message && <p className={styles.success}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default AdminPanel;
