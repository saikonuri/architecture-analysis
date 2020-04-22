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


let BASEURL = 'http://localhost:5004/'

class OrdersPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      orders: []
    };

    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    fetch(BASEURL + 'orders')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            orders: result
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



  onDelete(id){
    fetch(BASEURL + 'order/'+ id, {method: 'DELETE'})
      .then(res => res.json())
      .then(
        (result) => {
          var newOrders = this.state.orders;
          newOrders = newOrders.filter(function(order){
              return order.id !== id;
          })

          this.setState({
            orders: newOrders
          })
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
        <div class="Page">
          <br />
          <h1>Orders</h1>
          <br />
          <br />
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody align="center">
                {this.state.orders.map((u, i) =>
                  <tr key={i}>
                    <td>{u.email}</td>
                    <Link to={`/orders/${u.id}`}>Show</Link>
                    <Link onClick={() => this.onDelete(u.id)}>Destroy</Link>
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

export default OrdersPage;
