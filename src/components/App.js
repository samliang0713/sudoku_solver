import React from "react";
import Header from "./Header";
import Solver from "./Solver";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Solver />
      </div>
    );
  }
}

export default App;
