// форматирование!
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainForm from './components/MainForm'
import { ItemContextProvider } from './context/ItemContext'
import { AuthContextProvider } from './context/AuthContext'

function App() {
  return (
    <React.StrictMode>
      <AuthContextProvider>
        <ItemContextProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<MainForm />}
              />
            </Routes>
          </BrowserRouter>
        </ItemContextProvider>
      </AuthContextProvider>
    </React.StrictMode>
  );
}

export default App;
