import React, { Component } from 'react';
import Run from './run.jsx';

export default class Assign extends Component {

  render() {
    return (
      <div className="container">
        {this.props.assignment.map((ar, i) => {
          return (
            <div className="assignment" key={i}>
              <div className="header">
                <span className="name" key={i}>{this.props.nurses[i]}</span>
              </div>
              <div className="body">
                <Run run={ar} key={i} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
