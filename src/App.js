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
import MeteorList from "./components/pages/Projects/NasaApi/meteorList";
import TicTacToe from "./components/pages/Projects/TicTacToe/TicTacToe";
import ConnectFour from "./components/pages/Projects/ConnectFour/ConnectFour";

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
          <Route path="/nasaApp" element={<MeteorList />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/con4" element={<ConnectFour />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
