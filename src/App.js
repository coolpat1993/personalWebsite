import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cv from "./components/pages/Cv";
import Projects from "./components/pages/Projects";
import Contact from "./components/pages/Contact";
import Footer from "./components/Footer";
import FourOhFour from "./components/pages/FourOhFour";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/cv" element={<Cv />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/*" element={<FourOhFour />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
