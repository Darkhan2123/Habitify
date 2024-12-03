// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import AllHabitsPage from './pages/AllHabitsPage';
import HabitAnalyticsPage from './pages/HabitAnalyticsPage';
import SettingsPage from './pages/AppSettingsPage';
import HomePage from './pages/HomePage';
import NewAreaPage from './pages/NewAreaPage';
import withAuth from './hocs/withAuth';

// Wrap components with withAuth HOC
const AllHabitsPageWithAuth = withAuth(AllHabitsPage);
const HabitAnalyticsPageWithAuth = withAuth(HabitAnalyticsPage);
const SettingsPageWithAuth = withAuth(SettingsPage);
const HomePageWithAuth = withAuth(HomePage);
const NewAreaPageWithAuth = withAuth(NewAreaPage);

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePageWithAuth />} />
            <Route path="/all-habits" element={<AllHabitsPageWithAuth />} />
            <Route path="/habit-analytics" element={<HabitAnalyticsPageWithAuth />} />
            <Route path="/app-settings" element={<SettingsPageWithAuth />} />
            <Route path="/new-area" element={<NewAreaPageWithAuth />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
