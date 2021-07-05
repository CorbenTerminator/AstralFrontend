import React from 'react';
import {Link} from 'react-router-dom';


class ListProducts extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          products: [],
        };
    
        this.getProducts = this.getProducts.bind(this);
    }

    async getProducts() {
        const res = await fetch(`/api/products`, {
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
        const products = await this.getProducts();
        this.setState({products: products});
      }

    render() {
        return(
          <div>
          <h2>Товары</h2>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <Link to="/product" className="btn btn-primary me-md-2">Создать товар</Link>
          </div>
          <div>
            <div>
            <table className="table">
                <thead>
                  <tr>
                      <th scope="col">Название товара</th>
                      <th scope="col">Категория</th>
                      <th scope="col">Цена</th>
                  </tr>
                  </thead>  
                  <tbody>   
            {this.state.products.map((product, i) => (
              <Product
                name={product.product_name}
                price={product.price}
                category={product.category}
                key={product.product_id}
              />
            ))}
            </tbody>
                    </table>
            </div>
          </div>
          </div>
        );
      }
}

export default (ListProducts);

const Product = ({ name, price, category}) => (
  <tr>
      <td>{name}</td>
      <td>{price}</td>
      <td>{category}</td>
     </tr>
);