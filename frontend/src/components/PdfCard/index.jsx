import React from 'react';
import styles from './style.module.css';

const PdfCard = ({ file }) => {
  return (
    <div className={styles.pdfCard}>
      <embed src={`http://localhost:5000${file.firstPage}`} type="application/pdf" width="150" height="200" />
      <p>{file.description || 'No description available'}</p>
      <a href={`http://localhost:5000${file.firstPage}`} target="_blank" rel="noopener noreferrer">
        Open PDF
      </a>
    </div>
  );
};

export default PdfCard;
