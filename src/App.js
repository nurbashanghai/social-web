import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Routes from "./components/Routes/Routes";
import PostList from "./components/Posts/Post-list";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Routes/>
      </header>
    </div>
  );
}

export default App;
