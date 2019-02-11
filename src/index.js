import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { allDroplets } from "./fetchData/BasicDroplets";

const Module = props => (
  <div
    className="module"
    style={{
      backgroundColor: props.backgroundColor,
      left: props.x,
      top: props.y,
      width: props.width,
      height: props.height
    }}
  />
);
const Box = props => (
  <div className="box" style={{ backgroundColor: props.backgroundColor }} />
);
const array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
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
      droplets: allDroplets[5][0].droplets,
      working: allDroplets,
      current: 5,
      droplet: undefined,
      module: allDroplets[5][0].modules,
      future: undefined
    };
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress.bind(this));
    setInterval(() => {
      this.update();
    }, 2000);
  }
  componentWillUnmount() {
    document.addEventListener("keydown", this.handleKeyPress.bind(this));
  }
  update() {
    const future = this.state.future;
    const current = this.state.current;
    console.log(future + " " + current);
    if (future >= 0 && current !== future) {
      if (current - future > 0) {
        this.handleKeyPress({ keyCode: 37 });
      } else if (current - future < 0) {
        this.handleKeyPress({ keyCode: 39 });
      }
    }
  }
  setFuture(id) {
    this.setState({ future: id });
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
        this.setState({
          droplets: working[current + 1][0].droplets,
          current: current + 1,
          module: working[current + 1][0].modules
        });
      }
    }
    if (code === 37) {
      if (working[current - 1]) {
        this.setState({
          droplets: working[current - 1][0].droplets,
          current: current - 1,
          module: working[current - 1][0].modules
        });
      }
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
              {array.map(num => {
                return <Box key={num} />;
              })}
              <Module
                width={`${this.state.module.dimensions.x * 60}px`}
                height={`${this.state.module.dimensions.y * 60}px`}
                backgroundColor={`${this.state.module.color}`}
                x={`${
                  this.state.module.location.x > 0
                    ? this.state.module.location.x * 60 +
                      (60 - this.state.module.dimensions.x * 60) / 2
                    : (60 - this.state.module.dimensions.x * 60) / 2
                }px`}
                y={`${
                  this.state.module.location.y > 0
                    ? this.state.module.location.y * 60 +
                      (60 - this.state.module.dimensions.y * 60) / 2
                    : (60 - this.state.module.dimensions.y * 60) / 2
                }px`}
              />
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
                  onClick={() => this.setFuture(id)}
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
