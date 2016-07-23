import React, { Component } from 'react';

export default class Glossary extends Component {

	render() {
		return (
			<div className='glossary container'>
	      <ul>
	        <li>Display all nurses: Enter 'nurses'</li>
	        <li>Assign beds to shift: Display nurses, select nurses on duty, enter 'assign'</li>
	        <li>Clear current shift assignments: Enter 'clear'</li>
	        <li>Admit patient(s): Enter 'admit [bed1 bed2 bed3...]'</li>
	        <li>Discharge patient(s): Enter 'discharge [bed1 bed2 bed3...]'</li>
	        <li>Add a nurse: Enter 'add [nurse name]'</li>
	        <li>Remove a nurse: Enter 'remove [nurse name]'</li>
	      </ul>
	     </div>
    );
  }
}
