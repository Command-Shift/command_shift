import React, { Component } from 'react';
import { render } from 'react-dom';
import Assign from './Components/assign.jsx';
import Nurses from './Components/nurses.jsx';
import Input from './Components/input.jsx';
import Display from './Components/display.jsx';

import style from './Stylesheet/style.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.enter = this.enter.bind(this);
    this.refresh = this.refresh.bind(this);
    this.select = this.select.bind(this);
    this.reset = this.reset.bind(this);
    this.assign = this.assign.bind(this);
    this.add = this.add.bind(this);

    this.state = {
      beds: ['2','4','6','8A','8B','1A','1B','10A','10B','3A'
      ,'3B','12A','12B','5A','5B','14A','14B','7A','7B','16A','16B'
      ,'9A','9B','18A','18B','11A','11B','20A','20B','22A','22B','22C'
      ,'22D','15A','15B','15C','17A','17B','19A','19B','21A','21B','24A'
      ,'24B','24C','23A','23B','26A','26B','26C','25A','25B','27A','27B'
      ,'29A','29B','31A','31B','28A','28B','28C','30A','30B','33A','33B'
      ,'32A','32B','35A','35B','34A','34B','37A','37B','36A','36B','39A'
      ,'39B','38A','38B','41A','41B','40A','40B','43A','43B','42A','42B'
      ,'45A','45B','47A','47B','46A','46B','44A','44B','44C','48A','48B'],
      onduty: [],
      occupied: {},
      census: 98,
      view: '',
      emptyBeds: {},
      assignment: [],
      nurses: {}
    };
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    $.get('/nurses').then((data) => {
      this.setState({nurses: data});
    });
  }

  enter(event) {
    if(event.keyCode === 13) {
      let value = event.target.value;

      if (value.slice(0, 3) === 'add') {
        this.add(value);
        event.target.value = '';

      } else if (value.slice(0, 5) === 'empty') {
        let emptyBeds = value.toUpperCase().split(' ');
        emptyBeds.shift();
        const occupied = remove(emptyBeds, [...this.state.beds]);
        const census = occupied.length;
        const post = $.ajax({
          method: 'POST',
          url: '/emptyBeds',
          data: emptyBeds
        });
        this.setState({
          occupied: occupied,
          census: census,
          emptyBeds: emptyBeds,
          view: 'display'
        });
        event.target.value = '';
      } else if (value === 'clear') {
        event.target.value = '';
        this.reset();
      } else if (value === 'assign') {
        event.target.value = '';
        this.assign();
      } else if (value.slice(0, 6) === 'remove') {
        value = value.split(' ');
        const obj = {
          first: value[1],
          last: value[2]
        };
        const post = $.ajax({
          method: 'DELETE',
          url: '/nurse',
          data: obj
        });
        post.then(() => {
          this.refresh();
        });
        event.target.value = '';
      } else if (value === 'populate') {
        let beds = {beds: this.state.beds};
        $.ajax({
          method: 'POST',
          url: '/populate',
          data: beds
        });
      } else {
        event.target.value = '';
        this.setState({view: value});
      }
    }

    function remove(emptyBeds, beds) {
      return beds.filter(el => {
        if (emptyBeds.indexOf(el) < 0) return true;
      });
    }
  }

  assign() {
    const nurses = [...this.state.onduty];
    $.ajax({
      method: 'POST',
      url: '/assign',
      data: { onDuty: nurses }
    }).then((data) => {
      this.setState({ onduty: nurses, occupied: data, view: 'assign' });
    });
  }

  select(event) {
    this.state.onduty.push(event.target.value);
    this.setState(this.state);
  }

  add(value) {
    value = value.split(' ');
    const obj = {
      first: value[1],
      last: value[2]
    };
    const post = $.ajax({
      method: 'POST',
      url: '/nurse',
      data: obj
    });
    post.then(() => {
      this.refresh();
    });
  }

  reset() {
    $.get('/nurses').then((data) => {
      this.setState({
        beds: ['2','4','6','8A','8B','1A','1B','10A','10B','3A'
        ,'3B','12A','12B','5A','5B','14A','14B','7A','7B','16A','16B'
        ,'9A','9B','18A','18B','11A','11B','20A','20B','22A','22B','22C'
        ,'22D','15A','15B','15C','17A','17B','19A','19B','21A','21B','24A'
        ,'24B','24C','23A','23B','26A','26B','26C','25A','25B','27A','27B'
        ,'29A','29B','31A','31B','28A','28B','28C','30A','30B','33A','33B'
        ,'32A','32B','35A','35B','34A','34B','37A','37B','36A','36B','39A'
        ,'39B','38A','38B','41A','41B','40A','40B','43A','43B','42A','42B'
        ,'45A','45B','47A','47B','46A','46B','44A','44B','44C','48A','48B'],
        onduty: [],
        occupied: {},
        census: 98,
        view: '',
        emptyBeds: {},
        assignment: [],
        nurses: data
      });
    });
  }

  render() {
    switch (this.state.view) {
      case 'nurses':
        return (
          <div>
            <Input enter={this.enter}/>
            <Nurses
              nurses={this.state.nurses}
              select={this.select}/>
          </div>
        );
      case 'assign':
        return (
          <div>
            <Input enter={this.enter}/>
            <Assign assignment={this.state.assignment} nurses={this.state.onduty}/>
          </div>
        );
      case 'display':
        return (
          <div>
            <Input enter={this.enter}/>
            <Display
              emptyBeds={this.state.emptyBeds}
              census={this.state.census}/>
          </div>
        );
      default:
        return (
          <div>
            <Input enter={this.enter}/>
          </div>
        );
    }
  }
}

render(<App />, document.getElementById('content'));
