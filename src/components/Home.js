import React, { Component } from "react";

const postData = {
  to: "nick1",
  from: "nick1",
  token: "authStore.token",
  query: "tags",
  queryVars: {
    templateVars: {}
  }
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resp: ""
    };
  }
  run = async () => {
    // alert(1);
    this.setState({ resp: "loading..." });
    let headers = new Headers();
    headers.append("Content-type", "application/json");
    let payload = {
      method: "POST",
      mode: "cors",
      headers,
      body: JSON.stringify(postData)
    };

    let resp = await window.fetch("/api/v1/query", payload);
    let respJson = await resp.json();
    this.setState({ resp: JSON.stringify(respJson, null, 2) });
    // setCount(JSON.stringify(respJson, null, 2));
  };
  render() {
    return (
      <div>
        <h2 onClick={this.run}>Home</h2>
        My Home page!
        <pre>
          <code>{this.state.resp}</code>
        </pre>
      </div>
    );
  }
}

export default Home;
