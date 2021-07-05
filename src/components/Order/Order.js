import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import 'moment-timezone';

class Order extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
    
        this.state = {
          products: [],
        };
    
        this.getOrderProducts = this.getOrderProducts.bind(this);
      }

    async componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            const products = await this.getOrderProducts();
            this.setState({products: products});
        }
        
    }  

    async getOrderProducts() {
        const res = await fetch(`/api/orders/${this.props.order_id}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        return data;
    }
    
    timeConvert(time) {
        var t = new Date();
        t.setSeconds(time);
        var formatted = t.format("dd.mm.yyyy hh:MM:ss");
        return formatted;
    }

    render() {
        return(
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">{moment.unix(this.props.createdAt).tz('Europe/Moscow').format('LLL')}</div>
                    {this.props.status}
                    </div>
                    <table className="table caption-top">
                    <caption>Список товаров</caption>
                    <thead key={this.props.order_id}>
                        <tr>
                            <th scope="col">Название товара</th>
                            <th scope="col">Категория</th>
                            <th scope="col">Цена</th>
                        </tr>
                    </thead>  
                    <tbody>  
                    {this.state.products.map((product, i) => (
                        
                        <Product
                        product_name={product.product_name}
                        price={product.price}
                        category={product.category}
                        key={i}
                        />
                    
                    ))}
                        </tbody>
                    </table>
                </li>
        );
    }  

}

const Product = ({product_name, price, category}) => (
        <tr>
            <td>{product_name}</td>
            <td>{category}</td>
            <td>{price}</td>
        </tr>


);

export default (Order);