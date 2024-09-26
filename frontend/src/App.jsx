import React from 'react';
import PdfList from './components/PdfList';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <div className="App">
      <h1>ארכיון עלונים</h1>
      <PdfList />
      <AdminPanel />
    </div>
  );
}

export default App;
