import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    // change this line to grab the id passed on the URL
    const id = this.props.match.params.id;
    this.fetchData(id);
  }

  fetchData = id => {
    axios
      .get(`http://localhost:4400/projects/${id}`)
      .then(response => {
        this.setState(() => ({ data: response.data }));
      })
      .catch(error => {
        console.error(error);
      });
  };
  render() {
    return (
      <div>
        <p>{this.state.data}</p>
      </div>
    );
  }
}

export default App;
