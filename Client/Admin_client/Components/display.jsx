import React, { Component } from 'react';

export default class Display extends Component {
// props emptyBeds, occupied
  render() {
    const census = this.props.occupied.length;
    return (
      <div className="container">
          <div className="container-left">
            <div className="header">Today's empty beds:</div>
              {this.props.emptyBeds.map((el, i) => {
                return (
                  <span className="room" key={i}>{el}</span>
                );
              })}
          </div>
          <div className="container-right">
            <div className="header">Census:</div> <span className="large-font">{census}</span>
          </div>
      </div>
    );
  }
}
