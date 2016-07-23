// <BedRow /> takes each object that was sent down from <AssignmentTable /> and returns an HTML table row with bed number and notes embedded (that are not null).
var BedRow = React.createClass({
  render: function() {
    var bed = this.props.assignment.id
    return (
      <tr>
        <td>{bed}</td>
        <td>{this.props.assignment.notes}</td>
      </tr>
    );
  }
});

// <AssignmentTable />  runs a forEach loop through the array and passes each object with 'BEDASSIGNMENTS' down to <BedRow /> and pushes each <BedRow /> to a 'rows' array.
// After <AssignmentTable /> pushes all the <BedRow /> elements into the 'rows' array it returns a table with the 'rows' array.
// <BedAssignments /> renders <AssignmentTable /> table and ReactDOM.render attaches it to div with ID 'content'.
var AssignmentTable = React.createClass({
  render: function() {
    var rows = [];
    this.props.assignments.forEach(function(assignment) {
      rows.push(<BedRow assignment={assignment} key={assignment.id} />);
    }.bind(this));
    return (
      <table>
        <thead>
          <tr>
            <th>Bed</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

//BedAssignments will load assignments from server using '/getAssignments' url route via ajax get request.
//If the get request is successful, state will be updated for assignments data and the data will be passed down to <AssignmentTable />
//BedAssignemtns also has a handleLoginSubmit function to submit ajax post request which is passed down to <LoginForm />

var BedAssignments = React.createClass({
  
  loadAssignmentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log('BedAssignmentData', data);
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleLoginSubmit: function(name) {
    var names = this.state.data;
    var newNames = names.concat([name]);
    this.setState({data: newNames});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: name,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: names});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {

    // this.loadAssignmentsFromServer();
    // setInterval(this.loadAssignmentsFromServer, this.props.pollInterval);

  },

  componentWillUpdate: function() {
    //placeholder function. Not using it currently.
  },

  componentDidUpdate: function() {
    //placeholder function. Not using it currently.
  },

  render: function() {
    return (
      <div>
        <LoginForm onNameSubmit={this.handleLoginSubmit} />
        <AssignmentTable
          assignments = {this.state.data}
        />
      </div>
    );
  }
});

//LoginForm is used to collect the nurse's information to get their bed assignments.
//It collects first and last name and send an object {first: 'string', last: 'string'} as a post request to '/getAssignments' route
var LoginForm = React.createClass({
  getInitialState: function() {
    return {first: '', last: ''};
  },
  handleFirstChange: function(e) {
    this.setState({first: e.target.value});
  },
  handleLastChange: function(e) {
    this.setState({last: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var first = this.state.first.trim();
    var last = this.state.last.trim();
    if (!last || !first) {
      return;
    }
    this.props.onNameSubmit({first: first, last: last});
    //Commenting out setState so that the submitted user stays in state
    //this.setState({first: '', last: ''});
  },
  render: function() {
    return (
      <form className="loginForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="First name"
          value={this.state.first}
          onChange={this.handleFirstChange}
        />
        <input
          type="text"
          placeholder="Last name"
          value={this.state.last}
          onChange={this.handleLastChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});


//BedAssignments will ping '/getAssignments' route to get bed assignment array consisting of {bed: 'string', notes: 'string' || null} objects
//Results will be rendered to 'content' in HTML
ReactDOM.render(
  <BedAssignments url='/getAssignments' pollInterval={2000} />,
  document.getElementById('content')
);
