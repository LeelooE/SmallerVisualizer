import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {droplets1, droplets2, working2, droplets3} from './fetchData/BasicDroplets';

const Box = () => <div className="box" />;
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
  />
);
class Visualizer extends Component {
  constructor() {
    super();
    this.state = {
      droplets: [],
      working: [],
      current: 0
    };
  }
  componentDidMount() {
    setTimeout(this.tick1, 5000);
    setTimeout(this.tick2, 10000);
    setTimeout(this.tick3, 15000);
    document.addEventListener("keydown", this.handleKeyPress.bind(this));
  }
  componentWillUnmount() {
    document.addEventListener("keydown", this.handleKeyPress.bind(this));
  }
  handleKeyPress = (e) => {
      const code = e.keyCode;
      const working = this.state.working;
      const current = this.state.current;
      if(code === 39) {
        if(working[current + 1]){
          console.log(working[current + 1]);
          this.setState({droplets: working[current + 1]});
          this.setState({current: current + 1});
        }
      }
      if(code === 37) {
        if(working[current - 1]){
          console.log(working[current - 1]);
          this.setState({droplets: working[current - 1]});
          this.setState({current: current - 1});
        }
      }
  }
  tick1 = () => {
    this.fakefetchData(1);
    this.setState({working: [...this.state.working, droplets1]});
    this.setState({current: 0});
  }
  tick2 = () => {
    this.fakefetchData(2);
    this.setState({working: [...this.state.working, droplets2]});
    this.setState({current: 1});
  }
  tick3 = () => {
    this.fakefetchData(3);
    this.setState({working: [...this.state.working, droplets3]});
    this.setState({current: 2});
    console.log(this.state);
  }
  fakefetchData = num => {
    switch (num) {
      case 1:
        return this.setState({ droplets: droplets1 });
      case 2:
        return this.setState({ droplets: droplets2 });
      case 3:
        return this.setState({ droplets: droplets3 });
      default:
        return console.log("cycle done");
    }
  };
  fetchData = () => {
    return this.getData().then(json => {
      this.setState({ working: [...this.state.working, json], droplets: json.droplets});
      return json;
    });
  };
  getData = () => {
    return fetch("some json").then(response => response.json());
  };
  render() {
    return (
      <div className="app" 
      onKeyPress={this.handleKeyPress}
      tabIndex='0'
      >
        <h1>Simulation</h1>
        <div className="container">
          <div className="plate">
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
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
                  />
                );
              })}
          </div>
        </div>
        <h1>Process</h1>
        <div 
        className='process-bar' 
        style={{
            width: `${this.state.working.length * 40}px`,
            height: '15px',
        }}>{this.state.working &&
          this.state.working.map(e => {
            let id = this.state.working.indexOf(e);
            let background = "black";
            if(id === this.state.current) {
              background = "gold";
            }
            return (
              <button className='sec'
                key={id}
                style={{backgroundColor: `${background}`}}
              />
            )
          })
        }
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Visualizer/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
