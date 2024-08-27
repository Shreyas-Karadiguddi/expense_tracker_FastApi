// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';



const queryClient = new QueryClient();

const App = () => {

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute>
              <Dashboard />
            </PrivateRoute>} />

          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
};

export default App;
