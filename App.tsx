
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import InputForm from './components/InputForm';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import AmuletGenerator from './components/AmuletGenerator';
import { UserData } from './types';

const App: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleDataSubmit = (data: UserData) => {
    setUserData(data);
  };

  return (
    <HashRouter>
      <div className="flex h-screen w-full overflow-hidden bg-black text-white font-display">
        {userData && <Sidebar />}
        <div className="flex flex-1 flex-col overflow-hidden relative">
          <Header userData={userData} />
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            <Routes>
              <Route 
                path="/" 
                element={
                  !userData ? (
                    <InputForm onSubmit={handleDataSubmit} />
                  ) : (
                    <Navigate to="/dashboard" replace />
                  )
                } 
              />
              <Route 
                path="/dashboard" 
                element={userData ? <Dashboard userData={userData} /> : <Navigate to="/" replace />} 
              />
              <Route 
                path="/chat" 
                element={userData ? <Chatbot userData={userData} /> : <Navigate to="/" replace />} 
              />
              <Route 
                path="/amulet" 
                element={userData ? <AmuletGenerator userData={userData} /> : <Navigate to="/" replace />} 
              />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
