import React, { Component } from "react";
import "./App.css";
import queryString from "query-string";

class App extends Component {
  constructor() {
    super();
    this.state = {
      gdate: null,
      start: Date.now(),
    };
  }
  componentDidMount() {
    const parsed = queryString.parse(window.location.search);
    const { start } = parsed;
    this.setState({ start : Number(start) });
    setInterval(() => {
      this.setState({ gdate: start - Date.now() - 1000 }, () => {});
    }, 1000);
  }
  get = (time) => {
    if (time < 0) return "Ended";
    if (!time) return "Loading";

    var delta = Math.abs(time) / 1000;

    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    var seconds = delta % 60;
    seconds = Math.trunc(seconds);

    if (days > 0) {
      let day1 = days + ` day`;
      let hour1 = hours + ` hour`;
      if (days > 1) day1 += "s";
      if (hours > 1) hour1 += "s";
      if (hours === 0) return `${day1}`;
      return `${day1} and ${hour1}`;
    }
    if (hours > 0) {
      let hour1 = hours + ` hour`;
      let minute1 = minutes + ` minute`;
      if (hours > 1) hour1 += "s";
      if (minutes > 1) minute1 += "s";
      if (minutes === 0) return `${hour1}`;
      return `${hour1} and ${minute1}`;
    }
    if (minutes > 0) {
      let minute1 = minutes + ` minute`;
      let second1 = seconds + ` second`;
      if (minutes > 1) minute1 += "s";
      if (seconds > 1) second1 += "s";
      if (seconds === 0) return `${minute1}`;
      return `${minute1} and ${second1}`;
    }
    if (seconds > 0) {
      let second1 = seconds + ` second`;
      if (seconds > 1) second1 += "s";
      return `${second1}`;
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <video
            autoPlay={true} loop={true}
            src="https://cdn.discordapp.com/attachments/583600016501899284/767309492375257088/discord-spinner.webm"
            className="App-logo"
            alt="logo"
          />
          <h1>Giveaway Timer</h1>
          <p>{this.get(this.state.gdate)}</p>
          <p>
            {Date.now() > this.state.start ? "Ended" : "Ends"} on{" "}
            {new Date(this.state.start).toLocaleString()}
          </p>
        </header>
      </div>
    );
  }
}
export default App;
