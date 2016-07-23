import React, { Component } from 'react';
import Glossary from './glossary.jsx';

export default class GlossaryClick extends Component {

	render() {
		return (
			<div>
        <div style={{fontSize:24}} onClick={this.props.onClick}>
          Glossary<span style={{fontSize:12}}> (Click to hide/show)</span>
        </div>
        {
          this.props.glossaryVisible
            ? <Glossary />
            : false
        }
      </div>
    )
  }
}