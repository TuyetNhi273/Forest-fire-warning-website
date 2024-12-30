import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import { SocketContext, socket } from "./contexts/socket_io";
import { useSelector } from "react-redux";

import "./App.css"

import Header from "./pages/Header/Header"; 
import Footer from "./pages/Footer/Footer"; 
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

const HomePage = React.lazy(() => import("./pages/Home/HomePage"));
const HomeUser = React.lazy(() => import("./pages/Home/HomeUser"));
const AboutPage = React.lazy(() => import("./pages/About Us/AboutUs"));

const App = () => {

  const isMaster = useSelector((state) => state.auth.isMaster);
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <div className="app">
          <Header />
          <div className="container">
            <Suspense fallback={<div>Đang tải...</div>}>
              <Routes>
                <Route path="/home" element={isMaster ? <HomePage /> : <Navigate to="/homeuser" />} />
                <Route path="/homeuser" element={!isMaster ? <HomeUser /> : <Navigate to="/home" />} />
                <Route path="/" element={<AboutPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Suspense>
          </div>
          <Footer />
        </div>
      </Router>
    </SocketContext.Provider>
  );
};

export default App;

