import React from 'react';
import styles from './App.module.css';
import PdfList from './components/PdfList';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <div className={styles.main}>
      <h1>ארכיון עלונים</h1>
      <PdfList />
      <AdminPanel />
    </div>
  );
}

export default App;
