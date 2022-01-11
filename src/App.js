import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Search from "./components/Search";

import "./App.css";

function App() {
  // const [history, updateHistory] = useState([
  //   [...Array(9).keys()].map((i) => null),
  // ]);
  const [searchId, updateSearchId] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="search/:searchId" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
