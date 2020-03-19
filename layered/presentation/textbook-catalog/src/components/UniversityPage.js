import React from 'react';
import '../styles/UniversityPage.css'
import { Button, InputGroup, FormControl } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  withRouter
} from "react-router-dom";

let BASEURL = 'http://localhost:5001/';

class UniversityPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      university: {},
      departments: []
    };

  }

  componentDidMount() {
    let id  = this.props.match.params.id;
    fetch(BASEURL + 'university/' + id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            university: result.University[0],
            departments: result.Departments
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

  render() {
    if (!this.state.isLoaded) {
      return (
        <div>Loading...</div>
      );
    } else {
      return (
        <div className="Page">
          <br/>
          <h2>University Details</h2>
          <br/>
          <br/>
          <strong>Name:</strong>
          {this.state.university.name}
          <br/>
          <br/>
          <strong>Location:</strong>
          {this.state.university.location}
          <br/>
          <br/>
          <br/>
          <h5> Departments </h5>
          <br/>
          <div className="table-container-deps">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Abbreviation</th>
                  <th></th>
                </tr>
              </thead>
              <tbody align="center">
                {this.state.departments.map((d, i) =>
                  <tr key={i}>
                    <td>Department Name</td>
                    <td>{d.abbreviation}</td>
                    <Link to={{
                    pathname: `/departments/${d.id}`,
                    state: this.state.university.name
                    }}>
                      Details
                    </Link>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
};

export default withRouter(UniversityPage);
