import React, { Component } from 'react';
import Glossary from './glossary.jsx';

export default class GlossaryClick extends Component {

	render() {
		return (
			<div className="container">
        <div style={{fontSize:24}} onClick={this.props.onClick} className="right third">
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
