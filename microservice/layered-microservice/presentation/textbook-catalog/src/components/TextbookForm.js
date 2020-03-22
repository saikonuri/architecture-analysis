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
  withRouter,
  Redirect
} from "react-router-dom";

let BASEURL = 'http://business:5001/';

class TextbookForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: true,
      textbook: this.props.location.state,
      orderID: null,

    };

    this.emailInput = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    var email = this.emailInput.current.value;
    var data = { textbook: this.state.textbook.id, email: email };
    fetch(BASEURL + 'order', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.data.id);
        this.setState({
          orderID: data.data.id
        })
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  render() {
    if (this.state.orderID !== null) {
      return <Redirect to={`/orders/${this.state.orderID}`} />
    } else {
      return (
        <div className="Page">
          <br />
          <h2>New Order</h2>
          <br />
          <br />
          <div className="input-info">
            <label htmlFor="basic-url">Email</label>
            <InputGroup className="sm-3">
              <FormControl
                aria-label="Email"
                ref={this.emailInput}
              />
            </InputGroup>
            <br />
            <label htmlFor="basic-url">Textbook</label>
            <InputGroup className="sm-3">
              <FormControl
                aria-label="Textbook"
                ref={this.textbookInput}
                value={this.state.textbook.id}
              />
            </InputGroup>
          </div>
          <br />
          <div>
            <Button variant="primary" onClick={() => this.onSubmit()}>Create Order</Button>
          </div>
        </div>
      );
    }
  }
};

export default withRouter(TextbookForm);
