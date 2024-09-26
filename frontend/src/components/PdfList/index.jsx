import React, { useEffect, useState } from 'react';
import PdfCard from '../PdfCard';
import styles from './style.module.css';

const PdfList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/files')
      .then(res => res.json())
      .then(data => setFiles(data));
  }, []);

  return (
    <div className={styles.pdfList}>
      {files.map(file => (
        <PdfCard key={file.name} file={file} />
      ))}
    </div>
  );
};

export default PdfList;
