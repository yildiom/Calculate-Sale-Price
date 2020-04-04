import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';

import FormField from './FormField';


function App() {
  return (
    <div className="App">
      <Container>
        <Navbar expand="lg" bg="primary" variant="dark">
          <Navbar.Brand>
            <Nav.Item>Satış Fiyatı Hesapla</Nav.Item>
          </Navbar.Brand>
        </Navbar>
        <FormField />
      </Container>
    </div>
  );
}

export default App;
