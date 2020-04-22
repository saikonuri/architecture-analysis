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

class TextbookPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      textbook: {}
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    fetch(BASEURL + 'textbook/' + id)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            textbook: result[0]
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
          <br />
          <h2>Textbook Details</h2>
          <br />
          <br />
          <strong>Name:</strong>
          {this.state.textbook.name}
          <br />
          <br />
          <strong>Author:</strong>
          {this.state.textbook.author}
          <br />
          <br />
          <strong>Price (new):</strong>
          {this.state.textbook.new}
          <br />
          <br />
          <strong>Price (old):</strong>
          {this.state.textbook.used}
          <br />
          <br />
          <div>
            <Link to={{
              pathname: `/textbook/order`,
              state: this.state.textbook
            }}>
              <Button id= "order-button" variant="primary">Order</Button>
            </Link>
          </div>
          </div>
      );
    }
  }
};

export default withRouter(TextbookPage);
