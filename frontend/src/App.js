import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Authentication/LoginPage";
import HomePage from "./pages/Home/HomePage";
import UserProfilePage from "./pages/UserProfile/UserProfilePage";
import StatisticsPage from "./pages/Statistics/StatisticsPage";
import SignupPage from "./pages/Authentication/SignupPage";
import ManagementPage from "./pages/Management/ManagementPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/userprofile" element={<UserProfilePage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/management" element={<ManagementPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
