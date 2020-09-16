import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Posts from "./components/Posts";
import Detalle from "./components/Detalle";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route exact path="/post/detalle/:id" component={Detalle} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
