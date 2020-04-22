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

let BASEURL = 'http://localhost:5004/';

class CoursePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      course: {},
      textbooks: []
    };

  }

  componentDidMount() {
    let id  = this.props.match.params.id;
    fetch(BASEURL + 'course/' + id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            course: result.Course[0],
            textbooks: result.Textbooks
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
          <h2>Course Details</h2>
          <br/>
          <br/>
          <strong>Name:</strong>
          Name Not Found
          <br/>
          <br/>
          <strong>Mnemonic:</strong>
          {this.state.course.mnemonic}
          <br/>
          <br/>
          <br/>
          <h5> Textbooks </h5>
          <br/>
          <div className="table-container-deps">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Author</th>
                  <th></th>
                </tr>
              </thead>
              <tbody align="center">
                {this.state.textbooks.map((t, i) =>
                  <tr key={i}>
                    <td>{t.name}</td>
                    <td>{t.author}</td>
                    <Link
                    id={t.id}
                    to={{
                    pathname: `/textbooks/${t.id}`
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

export default withRouter(CoursePage);
