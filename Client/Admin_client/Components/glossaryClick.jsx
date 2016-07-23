import React, { Component } from 'react';
import Glossary from './glossary.jsx';

export default class GlossaryClick extends Component {

	render() {
		return (
			<div className='glossaryBlock'>

        <p className='glossaryTitle' onClick={this.props.onClick}>
          Glossary</p><p className='glossaryTitle' style={{fontSize:12}}> (Click to hide/show)</p>
        {
          this.props.glossaryVisible
            ? <Glossary />
            : false
        }
      </div>
    )
  }
}