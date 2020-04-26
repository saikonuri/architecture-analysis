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

class DepartmentPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      department: {},
      courses: []
    };

  }

  componentDidMount() {
    let id  = this.props.match.params.id;
    fetch(BASEURL + 'department/' + id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            department: result.Department[0],
            courses: result.Courses
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
    console.log(this.props);
    if (!this.state.isLoaded) {
      return (
        <div>Loading...</div>
      );
    } else {
      return (
        <div className="Page">
          <br/>
          <h2>Department Details</h2>
          <br/>
          <br/>
          <strong>Name:</strong>
          {this.state.department.abbreviation}
          <br/>
          <br/>
          <strong>University:</strong>
          {this.props.location.state}
          <br/>
          <br/>
          <br/>
          <div className="table-container-deps">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Mnemonic</th>
                  <th></th>
                </tr>
              </thead>
              <tbody align="center">
                {this.state.courses.map((c, i) =>
                  <tr key={i}>
                    <td>Course Name Not Found</td>
                    <td>{c.mnemonic}</td>
                    <Link id={c.mnemonic} to={`/courses/${c.id}`}>Details</Link>
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

export default withRouter(DepartmentPage);
