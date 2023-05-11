import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { history as appHistory } from "./router";

import { Route, Link, Switch, Redirect } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
import Messages from "./components/Messages";

import Postmate from "postmate";

console.log("waiting for handshake");
const handshake = new Postmate.Model({
  // Expose your model to the Parent. Property values may be functions, promises, or regular values
  init: () => {
    // set our auth values FROM the parent
  },
  history: historyPath => {
    console.log("Trying to change CHILD history:", historyPath);
    // navigate using React?
    appHistory.push(historyPath);
    console.log("DONE, CHILD should be updated", historyPath);
  },
  authData: async authData => {
    console.log("CHILD received authdata from parent:", authData);
    // make test request
    console.log("fetching");
    let result = await window.fetch(authData.url, {
      mode: "cors"
    });
    console.log("result1:", result);
    result = await result.json();
    console.log("result2:", result);
  },
  call2: async authData => {
    console.log("CHILD received authdata from parent:", authData);
    // make test request
    console.log("fetching");
    let result = await window.fetch(authData.url, {
      mode: "cors"
    });
    console.log("result1:", result);
    result = await result.json();
    console.log("result2:", result);
  }
});

// When parent <-> child handshake is complete, events may be emitted to the parent
let windowParent;
handshake.then(parent => {
  windowParent = parent;
  console.log("emitting to parent!");
  parent.emit("handle-event", {
    type: "eventtype",
    data: {
      test: "test"
    }
  });
});

(function(history) {
  var pushState = history.pushState;
  history.pushState = function(state) {
    if (typeof history.onpushstate === "function") {
      history.onpushstate({ state: state });
    }
    // whatever else you want to do
    // maybe call onhashchange e.handler
    return pushState.apply(history, arguments);
  };
})(window.history);
window.onpopstate = window.history.onpushstate = function(e, f) {
  // alert('state change');
  // alert("location: " + document.location + ", state: " + JSON.stringify(e.state))
  // console.log(window.location.pathname);
  // console.log(window.history);
  // console.log(window.title);
  // console.log('e',e,f);
  console.log("history was updated in CHILD, pushing changes to Parent");
  if (windowParent) {
    // console.log('prefix:', window.parent.__prefix);
    // window.parent.history.pushState(window.location.pathname);
    setTimeout(() => {
      windowParent.emit("handle-event", {
        type: "history",
        data: {
          state: window.history.state,
          title: window.document.title,
          url: window.location.pathname
        }
      });
    }, 1);
  }
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="menu">
          <ul>
            <li>
              {" "}
              <Link to="/">Home</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/messages">Messages</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/about">About</Link>{" "}
            </li>
          </ul>
        </div>
        <div className="App-intro">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/messages" component={Messages} />
            <Route path="/about" component={About} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
