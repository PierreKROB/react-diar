import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Error from './layout/Error';
<% if (includeHeader) { %>
import Header from './layout/Header';
import Footer from './layout/Footer';
<% } %>
<% if (includeLoginPage) { %>
import { AuthProvider } from './context/AuthContext';
<% } %>
<% if (includeLoginPage) { %>
import Login from './pages/Login';
import PublicRoute from './components/PublicRoute';
<% } %>
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Box className="App">
      <% if (includeLoginPage) { %>
      <AuthProvider>
      <% } %>
        <BrowserRouter>
          <% if (includeHeader) { %>
          <Header />
          <% } %>
          <Routes>
            <% if (includeLoginPage) { %>
            <Route path="login" element={<PublicRoute><Login /></PublicRoute>} />
            <% } %>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="*" element={<Error value=" La page que vous recherchez n'existe pas ou l'URL est incorrecte." />} />
          </Routes>
          <% if (includeHeader) { %>
          <Footer />
          <% } %>
        </BrowserRouter>
      <% if (includeLoginPage) { %>
      </AuthProvider>
      <% } %>
    </Box>
  );
}

export default App;
