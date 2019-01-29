import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { allDroplets} from "./fetchData/BasicDroplets";

const Box = () => <div className="box" />;
const array = [<Box key={0}/>, <Box key={1}/>, <Box key={2}/>, <Box key={3}/>, <Box key={4}/>, <Box key={5}/>, <Box key={6}/>, <Box key={7}/>, <Box key={8}/>, <Box key={9}/>, <Box key={10}/>, <Box key={11}/>, <Box key={12}/>, <Box key={13}/>, <Box key={14}/>, <Box key={15}/>, <Box key={16}/>, <Box key={17}/>, <Box key={18}/>, <Box key={19}/>];
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
    setTimeout(() => this.setState({ droplets: allDroplets[0],  working: [...this.state.working, allDroplets[0]], current: 0, droplet: allDroplets[0]}), 1000);
    setTimeout(() => this.setState({ droplets: allDroplets[1], working: [...this.state.working, allDroplets[1]], current: 1}), 3000);
    setTimeout(() => this.setState({ droplets: allDroplets[2], working: [...this.state.working, allDroplets[2]], current: 2 }), 6000);
    setTimeout(() => this.setState({ droplets: allDroplets[3], working: [...this.state.working, allDroplets[3]], current: 3 }), 9000);
    setTimeout(() => this.setState({ droplets: allDroplets[4], working: [...this.state.working, allDroplets[4]], current: 4 }), 12000);
    setTimeout(() => this.setState({ droplets: allDroplets[5], working: [...this.state.working, allDroplets[5]], current: 5 }), 15000);
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
          setTimeout(() => this.setState({ droplets: working[current + 1] }), 1000);
          this.setState({ current: current + 1 });
      }
    }
    if (code === 37) {
      if (working[current - 1]) {
          setTimeout(() => this.setState({ droplets: working[current - 1] }), 1000);
          this.setState({ current: current - 1 });
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
            { array.map(box => {return (box)})}
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
