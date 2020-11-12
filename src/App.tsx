import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import IndexContainer from './page/indexContainer';

function App() {
  return (
    <BrowserRouter>
      <Route path='/' component={IndexContainer} />
    </BrowserRouter>
  );
}

export default App;
