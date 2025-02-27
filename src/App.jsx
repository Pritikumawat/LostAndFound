import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
// import Login from "./components/Login";
// import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Lost from "./components/Lost";
// import Found from "./components/Found";
import Login from "./components/Login";
// import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// import { Verified } from "lucide-react";
import Verified from './components/Verified'
import Report from './components/Report'

const App = () => {
  return (
    // // <Lost/>
    // // <browserRouter>
    <>
      
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/lost" element={<Lost />} />
        {/* <Route path="/found" element={<Found />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/verification" element={<Verified />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </>
    // </BrowserRouter>
    // <div>hii</div>
  );
};

export default App;
