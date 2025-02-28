import React from "react";
import "./App.css";
import Home from "./components/Home";
import Lost from "./components/Lost";
import Found from "./components/Found";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Verified from "./components/Verified";
import Report from "./components/Report";
import ClaimForm from "./components/ClaimForm";

const Layout = ({ children }) => (
  // <>
  //   <div className="min-h-screen flex flex-col"> {/* ✅ Ensures full height */}
  //   <Navbar />
  //   <main className="flex-grow pt-16">{children}</main> {/* ✅ Pushes footer down */}
  //   <Footer className="mt-auto" /> {/* ✅ Keeps footer at bottom */}
  // </div>
  <div className="flex flex-col h-screen overflow-hidden justify-center items-center w-full">
    {/* ✅ Ensures full height */}
    <Navbar className="fixed top-0 w-full z-50 shadow-md overflow-auto w-full" />
    <main className="pt-16 pb-16 overflow-auto">{children}</main>{" "}
    {/* ✅ Pushes footer down */}
    <Footer className="bottom-0 w-screen z-50 w-full" />{" "}
    {/* ✅ Keeps footer at bottom */}
  </div>
  // </>
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
          <Route path="/login" element={<Login />} />
          <Route path="/claim/:id" element={<ClaimForm />} />
        </Routes>
      </Layout>
      {/* // <Navbar />
      // <Home />
      // <Footer className="fixed bottom-0 w-full z-50 shadow-lg bg-white h-16 flex items-center justify-center" /> */}
    </>
  );
};

export default App;
