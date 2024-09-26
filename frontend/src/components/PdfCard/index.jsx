import React from 'react';
import styles from './style.module.css';

const PdfCard = ({ file }) => {
  return (
    <a href={`http://localhost:5000${file.firstPage}`} target="_blank" rel="noopener noreferrer">
      <div className={styles.main}>
        <embed src={`http://localhost:5000${file.firstPage}`} type="application/pdf" width="150" height="200" />
        <p>{file.description || 'No description available'}</p>

        {/* Open PDF */}
      </div>
    </a>
  );
};

export default PdfCard;
