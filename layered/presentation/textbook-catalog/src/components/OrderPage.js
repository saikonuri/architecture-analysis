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

class OrderPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      order: {}
    };
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    fetch(BASEURL + 'orders/' + id)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            order: result
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
          <h2>Order Details</h2>
          <br />
          <br />
          <strong>Email:</strong>
          {this.state.order.Email}
          <br />
          <br />
          <strong>Textbook:</strong>
          {this.state.order.Textbook.name}
          <br />
          <br />
          <strong>Author:</strong>
          {this.state.order.Textbook.author}
          <br />
          <br />
          </div>
      );
    }
  }
};

export default withRouter(OrderPage);
