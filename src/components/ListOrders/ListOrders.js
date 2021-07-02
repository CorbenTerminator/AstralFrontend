import React from 'react';
import {Link} from 'react-router-dom';
import Order from '../Order/Order'

class ListOrders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
    };

    this.getOrders = this.getOrders.bind(this);
  }

  async getOrders() {
    const res = await fetch(`/api/orders`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (res.status !== 200) {
      console.log(res.status);
      return new Error('Something went wrong');
    } 
    const data = await res.json();
    return data;
  }

  async componentDidMount() {
    const orders = await this.getOrders();
    this.setState({orders: orders});
  }

  render() {
    return(
      <div>
      <h2>Ваши заказы</h2>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
      <Link to="/order" className="btn btn-primary me-md-2">Создать заказ</Link>
      </div>
      
      <div>
        <div>
        <ol className="list-group list-group-numbered">  
        {this.state.orders.map((order, i) => (
          <Order
            status={order.status}
            createdAt={order.createdAt}
            order_id={order.order_id}
            key={order.order_id}
          />

        ))}

        </ol>
        </div>
      </div>
      </div>
    );
  }
  
}

// const Order = ({ status, createdAt}) => (
//   <div>
//     <div>
//       <td>{status}</td>
//       <td>{createdAt}</td>
//     </div>
//   </div>
// );

export default (ListOrders);

