import React, { StrictMode, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CategoriesPanel from "./components/CategoriesPanel/CategoriesPanel.jsx";
import Board from "./components/Board/Board.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import styles from "./App.module.css";
import HomePage from "./components/HomePage/HomePage";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;