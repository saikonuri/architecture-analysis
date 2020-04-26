import React from 'react';
import '../styles/UniversityPage.css'
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";


let BASEURL = 'http://localhost:5001/'

class UniversitiesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      universities: [],
      filtered: []
    };
    this.onSearch = this.onSearch.bind(this);
    this.checkKeyword = this.checkKeyword.bind(this);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    fetch(BASEURL + 'universities')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            universities: result,
            filtered: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  checkKeyword(university) {
    return university.name.toLowerCase().includes(this.textInput.current.value.toLowerCase());
  }

  onSearch() {
    var x = this.state.universities;
    var search = this.textInput.current.value;
    console.log(search);
    if (search === "") {
      this.setState({
        filtered: x
      });
    } else {
      this.setState({
        filtered: x.filter(this.checkKeyword)
      });
    }

  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div>Loading...</div>
      );
    } else {
      return (
        <div class="Page">
          <br />
          <h1>Universities</h1>
          <br />
          <div class="SearchGroup">
            <InputGroup className="sm-3">
              <FormControl
                placeholder="Search..."
                aria-label="Search"
                ref={this.textInput}
                id="search"
              />
            </InputGroup>
            <br />
            <Button id= "search-button" variant="primary" onClick={() => this.onSearch()}>Search</Button>
          </div>
          <br />
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th></th>
                </tr>
              </thead>
              <tbody align="center">
                {this.state.filtered.map((u, i) =>
                  <tr key={i}>
                    <td>{u.name}</td>
                    <td>{u.location}</td>
                    <Link id= {u.id} to={`/universities/${u.id}`}>Details</Link>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

export default UniversitiesPage;
