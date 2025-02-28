import React from "react";
import "./App.css";
import Home from "./components/Home";
import Lost from "./components/Lost";
import Found from "./components/Found";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Verified from "./components/Verified";
import Report from "./components/Report";
import ClaimForm from "./components/ClaimForm";
import Feedback from "./components/Feedback";

const Layout = ({ children }) => (
  <div className="flex flex-col h-screen overflow-hidden justify-center items-center w-full">
    <Navbar className="fixed top-0 z-50 shadow-md overflow-auto w-full" />
    <main className="pt-16 pb-16 overflow-auto">{children}</main>
    <Footer className="bottom-0 z-50 w-full" />
  </div>
);
const App = () => {
  return (
    <>
      <Layout className="w-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/lost" element={<Lost />} />
          <Route path="/found" element={<Found />} />
          <Route path="/verified/:id" element={<Verified />} />
          <Route path="/report" element={<Report />} />
          <Route path="/claim/:id" element={<ClaimForm />} />
          <Route path="/feedback" element={<Feedback/>} />
       </Routes>
      </Layout>
    </>
  );
};

export default App;
