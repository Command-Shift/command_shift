import React, { Component } from 'react';

export default class Run extends Component {

  render() {
    return (
      <div className="run">
        {this.props.run.map((el, i) => {
          return <span className="room" key={i}>{el}</span>;
        })}
      </div>
    );
  }
}
