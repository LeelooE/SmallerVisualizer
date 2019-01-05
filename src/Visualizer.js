import React, { Component } from "react";
const droplets1 = [
  {
    id: 1,
    location: { y: 0, x: 0 },
    dimensions: { y: 1, x: 1 },
    volume: 1.0,
    color: "blue"
  }
];
const droplets2 = [
  {
    id: 1,
    location: { y: 1, x: 0 },
    dimensions: { y: 1, x: 1 },
    volume: 1.0,
    color: "blue"
  },
  {
    id: 2,
    location: { y: 1, x: 2 },
    dimensions: { y: 1, x: 1 },
    volume: 1.0,
    color: "red"
  }
];
const working2 = {
  mixlocation: {y: 1, x: 1}
}
const droplets3 = [
  {
    id: 3,
    location: { y: 1, x: 1 },
    dimensions: { y: 1, x: 1 },
    volume: 2.0,
    color: "purple"
  }
];
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
      working: []
    };
  }
  componentDidMount() {
    setTimeout(this.tick1, 5000);
    setTimeout(this.tick2, 10000);
    setTimeout(this.tick3, 15000);
  }
  tick1 = () => {
    this.fakefetchData(1);
    this.setState({working: [...this.state.working, droplets1]});
  }
  tick2 = () => {
    this.fakefetchData(2);
    this.setState({working: [...this.state.working, droplets2]});
  }
  tick3 = () => {
    this.fakefetchData(3);
    this.setState({working: [...this.state.working, droplets3]});
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
      <div className="app">
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
            return (
              <button className='sec'
                key={id}
              />
            )
          })
        }
        </div>
      </div>
    );
  }
}

export default Visualizer;
