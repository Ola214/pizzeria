import React from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
import HomePage from './components/pages/HomePage/HomePage';
import TablePage from './components/pages/TablePage/TablePage';
import TableDetailsPage from './components/pages/TableDetailsPage/TableDetailsPage';
import NotFound from './components/pages/NotFound/NotFound';

function App(){
  return (
    <Container className="my-4">
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/table/:id' element={<TablePage />} />
        <Route path='/table/:id/edit' element={<TableDetailsPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
