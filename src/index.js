import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { droplets1, droplets2, droplets3, droplets4, droplets5, droplets6} from "./fetchData/BasicDroplets";

const Box = () => <div className="box" />;
const array = [<Box />, <Box />, <Box />, <Box />, <Box />, <Box />, <Box />, <Box />, <Box />, <Box />, <Box />, <Box />, <Box />, <Box />, <Box />, <Box />, <Box />, <Box />, <Box />, <Box />];
const Droplet = props => (
  <div
    className="droplet"
    style={{
      left: props.left,
      top: props.top,
      animation: props.animation,
      backgroundColor: props.backgroundColor,
      width: props.width,
      height: props.height
    }}
    onMouseOver={props.handleClick}
  />
);
const Details = props => (
  <div className="details">
    <p>Volume: {props.volume}</p>
    <p>Droplet ID: {props.id}</p>
  </div>
);
class Visualizer extends Component {
  constructor() {
    super();
    this.state = {
      droplets: [],
      working: [],
      current: 0,
      droplet: undefined
    };
  }
  componentDidMount() {
    setTimeout(() => this.fakefetchData(1), 2500);
    setTimeout(() => this.fakefetchData(2), 5000);
    setTimeout(() => this.fakefetchData(3), 7500);
    setTimeout(() => this.fakefetchData(4), 10000);
    setTimeout(() => this.fakefetchData(5), 12500);
    setTimeout(() => this.fakefetchData(6), 15000);
    document.addEventListener("keydown", this.handleKeyPress.bind(this));
  }
  componentWillUnmount() {
    document.addEventListener("keydown", this.handleKeyPress.bind(this));
  }
  handleDropletClick(e) {
    this.setState({ droplet: e });
  }
  handleKeyPress = e => {
    const code = e.keyCode;
    const working = this.state.working;
    const current = this.state.current;
    if (code === 39) {
      if (working[current + 1]) {
        this.setState({ droplets: working[current + 1] });
        this.setState({ current: current + 1 });
      }
    }
    if (code === 37) {
      if (working[current - 1]) {
        this.setState({ droplets: working[current - 1] });
        this.setState({ current: current - 1 });
      }
    }
  };
  fakefetchData = num => {
    switch (num) {
      case 1:
        return this.setState({ droplets: droplets1,  working: [...this.state.working, droplets1], current: 0, droplet: droplets1});
      case 2:
        return this.setState({ droplets: droplets2, working: [...this.state.working, droplets2], current: 1});
      case 3:
        return this.setState({ droplets: droplets3, working: [...this.state.working, droplets3], current: 2 });
        case 4:
        return this.setState({ droplets: droplets4, working: [...this.state.working, droplets4], current: 3 });
        case 5:
        return this.setState({ droplets: droplets5, working: [...this.state.working, droplets5], current: 4 });
        case 6:
        return this.setState({ droplets: droplets6, working: [...this.state.working, droplets6], current: 5 });
      default:
        return console.log("cycle done?");
    }
  };
  fetchData = () => {
    return this.getData().then(json => {
      this.setState({
        working: [...this.state.working, json],
        droplets: json.droplets
      });
      return json;
    });
  };
  getData = () => {
    return fetch("some json").then(response => response.json());
  };
  render() {
    return (
      <div className="app" onKeyPress={this.handleKeyPress} tabIndex="0">
        <h1>Simulation</h1>
        <div className="top-part">
          <div className="container">
            <div className="plate">
            {array.map(box => {return (box)})}
              {this.state.droplets &&
                this.state.droplets.map(el => {
                  let width = el.volume * 15;
                  let height = el.volume * 15;
                  let left =
                    el.location.x > 0
                      ? el.location.x * 60 + (60 - width) / 2
                      : (60 - width) / 2;
                  let top =
                    el.location.y > 0
                      ? el.location.y * 60 + (60 - width) / 2
                      : (60 - width) / 2;
                  return (
                    <Droplet
                      key={el.id}
                      top={`${top}px`}
                      left={`${left}px`}
                      backgroundColor={el.color}
                      width={`${width}px`}
                      height={`${height}px`}
                      handleClick={() => this.handleDropletClick(el)}
                    />
                  );
                })}
            </div>
          </div>
          <div>
            <h1>Details</h1>
            <div className="details">
              {this.state.droplet && (
                <Details
                  volume={this.state.droplet.volume}
                  id={this.state.droplet.id}
                />
              )}
            </div>
          </div>
        </div>
        <h1>Process</h1>
        <div
          className="process-bar"
          style={{
            width: `${this.state.working.length * 40}px`,
            height: "15px"
          }}
        >
          {this.state.working &&
            this.state.working.map(e => {
              let id = this.state.working.indexOf(e);
              let background = "black";
              if (id === this.state.current) {
                background = "gold";
              }
              return (
                <button
                  className="sec"
                  key={id}
                  style={{ backgroundColor: `${background}` }}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Visualizer />, document.getElementById("root"));
serviceWorker.unregister();
