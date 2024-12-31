import React from 'react';
import Header from './Components/Common/Header';
import Footer from './Components/Common/Footer';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </>
  );
};

export default App;
