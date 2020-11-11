import React from "react";
import "./App.css";
import axios from "axios";

const App = async () => {

  const post = async () => {
    await axios.post("http://localhost:3000/walking", {
      date: Date.now(),
      distance: 11111,
    });
  };


  return (
    <div className="App">
      <button onClick={post}>2141234</button>
    </div>
  );
};

export default App;
