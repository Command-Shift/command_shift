import React, { Component } from 'react';

export default class Display extends Component {

  render() {
    return (
      <div className="container">
          <div className="container-2col">
            <h2>Today's empty beds:</h2>
              {this.props.emptyBeds.map((el, i) => {
                return (
                  <span className="room" key={i}>{el}</span>
                );
              })}
          </div>
          <div className="container-2col">
            <h2>Today's Census: <span id="census">{this.props.census}</span></h2>
          </div>
      </div>
    );
  }
}
