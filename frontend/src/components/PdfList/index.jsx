import React, { useEffect, useState } from 'react';
import PdfCard from '../PdfCard';
import styles from './style.module.css';

const PdfList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/files')
      .then(res => {
        if (!res.ok) throw new Error('שגיאה בקבלת הקבצים');
        return res.json();
      })
      .then(data => {
        setFiles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('לא ניתן לטעון את הקבצים');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className={styles.status}>טוען קבצים...</p>;
  if (error) return <p className={styles.status}>{error}</p>;
  if (files.length === 0) return <p className={styles.status}>לא נמצאו קבצים</p>;

  return (
    <div className={styles.main}>
      {files.map(file => (
        <PdfCard key={file.name} file={file} />
      ))}
    </div>
  );
};

export default PdfList;
