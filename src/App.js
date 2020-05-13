import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Header from './Header';
import MemeGenerator from './MemeGenerator';

function App() {
  return (
    <div className="App">
      <Header />
      <MemeGenerator />
    </div>
  );
}

export default App;
