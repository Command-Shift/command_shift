import React, { Component } from 'react';
import { render } from 'react-dom';
import Assign from './Components/assign.jsx';
import Nurses from './Components/nurses.jsx';
import Input from './Components/input.jsx';
import Display from './Components/display.jsx';
import Glossary from './Components/glossary.jsx';
import GlossaryClick from './Components/glossaryClick.jsx';
import style from './Stylesheet/style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.enter = this.enter.bind(this);
    this.onClick = this.onClick.bind(this);
    this.refresh = this.refresh.bind(this);
    this.select = this.select.bind(this);
    this.reset = this.reset.bind(this);
    this.assign = this.assign.bind(this);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.admit = this.admit.bind(this);
    this.discharge = this.discharge.bind(this);
    this.addNote = this.addNote.bind(this);

    this.state = {
      beds: ['2', '4', '6', '8A', '8B', '1A', '1B', '10A', '10B', '3A',
      '3B', '12A', '12B', '5A', '5B', '14A', '14B', '7A', '7B', '16A', '16B',
      '9A', '9B', '18A', '18B', '11A', '11B', '20A', '20B', '22A', '22B', '22C',
      '22D', '15A', '15B', '15C', '17A', '17B', '19A', '19B', '21A', '21B', '24A',
      '24B', '24C', '23A', '23B', '26A', '26B', '26C', '25A', '25B', '27A', '27B',
      '29A', '29B', '31A', '31B', '28A', '28B', '28C', '30A', '30B', '33A', '33B',
      '32A', '32B', '35A', '35B', '34A', '34B', '37A', '37B', '36A', '36B', '39A',
      '39B', '38A', '38B', '41A', '41B', '40A', '40B', '43A', '43B', '42A', '42B',
      '45A', '45B', '47A', '47B', '46A', '46B', '44A', '44B', '44C', '48A', '48B'],
      onduty: [],
      occupied: [],
      emptyBeds: [],
      assignment: [],
      nurses: {},
      glossaryVisible: false,
      view: '',
    };
  }

  componentDidMount() {
    this.refresh();
  }

  refresh(str) {
    if (!str) str = '';
    const obj = {
      view: str,
      assignment: [],
    };
    const nQuery = $.get('/nurses');
    const ocbQuery = $.get('/occupiedBeds');
    const ebQuery = $.get('/emptyBeds');
    nQuery.then(data => {
      const res = [];
      data.forEach(el => {
        res.push(`${el.first} ${el.last}`);
      });
      obj.nurses = res;
    });
    ocbQuery.then(data => {
      obj.occupied = data;
    });
    ebQuery.then(data => {
      obj.emptyBeds = data;
      console.log(obj);
      this.setState(obj);
    });
  }

  // all requests flow through the command line on pressing enter
  enter(event) {
    if (event.keyCode === 13) {
      const value = event.target.value;
      if (value.slice(0, 3) === 'add') { // inserts a new nurse in db
        event.target.value = '';
        this.add(value);
      } else if (value.slice(0, 9) === 'discharge') {
        event.target.value = '';
        this.discharge(value);
      } else if (value === 'clear') { // turned off for now
        event.target.value = '';
        this.reset();
      } else if (value === 'assign') {
        event.target.value = '';
        this.assign();
      } else if (value.slice(0, 6) === 'remove') {
        event.target.value = '';
        this.remove(value);
      } else if (value === 'populate') { // development only
        const beds = { beds: this.state.beds };
        $.ajax({
          method: 'POST',
          url: '/populate',
          data: beds
        });
      } else if (value.slice(0, 5) === 'admit') {
        event.target.value = '';
        this.admit(value);
      } else if (value.slice(0, 4) === 'note') {
        event.target.value = '';
        this.addNote(value.slice(4));
      } else {
        event.target.value = '';
        this.setState({ view: value });
      }
    }
  }

  // toggle admin glossary
  onClick() {
    this.setState({ glossaryVisible: !this.state.glossaryVisible });
  }

  addNote(value) {
    const bed = value.substr(0, value.indexOf(' '));
    const note = value.substr(value.indexOf(' ') + 1);
    $.ajax({
      method: 'POST',
      url: '/note',
      data: { bed, notes: note },
    });
  }

  // bed(s) becomes unoccupied
  discharge(value) {
    const arr = value.toUpperCase().split(' ');
    arr.shift();
    $.ajax({
      method: 'POST',
      url: '/emptyBeds',
      data: { emptyBeds: arr },
    }).then(() => {
      this.refresh('display');
    });
  }

  // bed(s) becomes occupied
  admit(value) {
    const arr = value.toUpperCase().split(' ');
    arr.shift();
    $.ajax({
      method: 'POST',
      url: '/addBeds',
      data: { addBeds: arr },
    }).then(() => {
      this.refresh('display');
    });
  }

  // administrator assigns beds to a new shift of nurses
  assign() {
    const nurses = [...this.state.onduty];
    const post = $.ajax({
      method: 'POST',
      url: '/assign',
      data: { onDuty: nurses },
    });
    post.then((data) => {
      this.setState({ onduty: data.onDuty, assignment: data.assignment, view: 'assign' });
    });
  }

  select(event) {
    this.state.onduty.push(event.target.value);
    this.setState(this.state);
  }

  // a new nurse is hired
  add(value) {
    const input = value.split(' ');
    const obj = {
      first: input[1],
      last: input[2],
    };
    const post = $.ajax({
      method: 'POST',
      url: '/nurse',
      data: obj,
    });
    post.then(() => {
      this.refresh();
    });
  }

  // a nurse is fired
  remove(value) {
    const input = value.split(' ');
    const obj = {
      first: input[1],
      last: input[2],
    };
    const post = $.ajax({
      method: 'DELETE',
      url: '/nurse',
      data: obj,
    });
    post.then(() => {
      this.refresh('nurses');
    });
  }

  reset() {
    $.get('/nurses').then((data) => {
      this.setState({
        beds: ['2', '4', '6', '8A', '8B', '1A', '1B', '10A', '10B', '3A',
        '3B', '12A', '12B', '5A', '5B', '14A', '14B', '7A', '7B', '16A', '16B',
        '9A', '9B', '18A', '18B', '11A', '11B', '20A', '20B', '22A', '22B', '22C',
        '22D', '15A', '15B', '15C', '17A', '17B', '19A', '19B', '21A', '21B', '24A',
        '24B', '24C', '23A', '23B', '26A', '26B', '26C', '25A', '25B', '27A', '27B',
        '29A', '29B', '31A', '31B', '28A', '28B', '28C', '30A', '30B', '33A', '33B',
        '32A', '32B', '35A', '35B', '34A', '34B', '37A', '37B', '36A', '36B', '39A',
        '39B', '38A', '38B', '41A', '41B', '40A', '40B', '43A', '43B', '42A', '42B',
        '45A', '45B', '47A', '47B', '46A', '46B', '44A', '44B', '44C', '48A', '48B'],
        onduty: [],
        assignment: [],
        glossaryVisible: false,
        view: '',
      });
    });
  }

  render() {
    switch (this.state.view) {
      case 'nurses':
        return (
          <div>
            <Input
              enter={this.enter}
              glossaryVisible={this.state.glossaryVisible}
              onClick={this.onClick}
            />
            <Nurses
              nurses={this.state.nurses}
              select={this.select}
            />
          </div>
        );
      case 'assign':
        return (
          <div>
            <Input
              enter={this.enter}
              glossaryVisible={this.state.glossaryVisible}
              onClick={this.onClick}
            />
            <Assign
              assignment={this.state.assignment}
              nurses={this.state.onduty}
            />
          </div>
        );
      case 'display':
        return (
          <div>
            <Input
              enter={this.enter}
              glossaryVisible={this.state.glossaryVisible}
              onClick={this.onClick}
            />
            <Display
              emptyBeds={this.state.emptyBeds}
              occupied={this.state.occupied}
            />
          </div>
        );
      default:
        return (
          <div>
            <Input
              enter={this.enter}
              glossaryVisible={this.state.glossaryVisible}
              onClick={this.onClick}
            />
          </div>
        );
    }
  }
}

render(<App />, document.getElementById('content'));
