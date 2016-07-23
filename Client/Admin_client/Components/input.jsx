import React, { Component } from 'react';
import GlossaryClick from './glossaryClick.jsx'

export default class Input extends Component {

  render() {
    return (
      <div>
        <h1 className='title'>cmd_shift</h1>
        <div id="maininput">
          <input name="emptyBeds"
            type="text"
            placeholder="Enter commands here ..."
            onKeyDown={this.props.enter}
            autoFocus={true}
            id="main"
            >
          </input>
          <span className="nothide">{this.props.clear}</span>
          <GlossaryClick glossaryVisible={ this.props.glossaryVisible } onClick={ this.props.onClick }/>
        </div>
      </div>
    );
  }
}
