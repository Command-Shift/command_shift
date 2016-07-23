import React, { Component } from 'react';

export default class Glossary extends Component {

	render() {
		return (
			<div className='glossary container'>
	      <ul>
	        <li><strong>Display</strong> the day's census: Enter 'display'</li>
	        <li>Display all <strong>nurses</strong>: Enter 'nurses'</li>
	        <li><strong>Assign</strong> beds to shift: Display nurses, select nurses on duty, enter 'assign'</li>
	        <li>Add a <strong>note</strong> to a patient's bed: Enter 'note [bed] [your note]'</li>
	        <li><strong>Clear</strong> current shift assignments: Enter 'clear'</li>
	        <li><strong>Admit</strong> patient(s): Enter 'admit [bed1 bed2 bed3...]'</li>
	        <li><strong>Discharge</strong> patient(s): Enter 'discharge [bed1 bed2 bed3...]'</li>
	        <li><strong>Add</strong> a nurse: Enter 'add [nurse's full name]'</li>
	        <li><strong>Remove</strong> a nurse: Enter 'remove [nurse's full name]'</li>
	        <li><strong>Populate</strong> database with all beds: Enter 'populate'</li>
	      </ul>
	     </div>
    );
  }
}
