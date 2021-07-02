import React, { Component } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import { history } from '../../services/history';


class CreateOrder extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          products: [],
        };
    
        this.getProducts = this.getProducts.bind(this);
    }

    async componentDidMount() {
        const products = await this.getProducts();
        this.setState({products: products});
    }  

    async getProducts() {
        const res = await fetch(`/api/products`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        return data;
    }  

    componentWillMount = () => {
      this.selectedCheckboxes = new Set();
    }
  
    toggleCheckbox = label => {
      if (this.selectedCheckboxes.has(label)) {
        this.selectedCheckboxes.delete(label);
      } else {
        this.selectedCheckboxes.add(label);
      }
    }

    async PostOrder() {
        const res = await fetch('/api/orders', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({'status_id': 1})
          })
        if (res.status !== 200) {
            console.log(res.status);
            return new Error('Something went wrong');
        }   
        const data = await res.text();
        return data;
    }

    async PostProdOrder(order_id, product_id) {
        const res = await fetch(`/api/prodorder/${order_id}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({'product_id': product_id})
          })
        if (res.status !== 200) {
            console.log(res.status);
            return new Error('Something went wrong');
        }
        const data = await res.text()
        return data
    }
  
    handleFormSubmit = async (formSubmitEvent) => {
      formSubmitEvent.preventDefault();
      const newOrder = await this.PostOrder();
    //   if (!!(newOrder)) {
    //     console.log("Error creating an order");
    //     return;
    //   }
  
      for (const checkbox of this.selectedCheckboxes) {
        const res = await this.PostProdOrder(newOrder, checkbox);
        console.log(res);
      }
      history.push('/orders')
    }
  
    createCheckbox = (product, i) => (
      <Checkbox
        object_id={product.product_id}
        label={product.product_name}
        handleCheckboxChange={this.toggleCheckbox}
        key={i}
      />
    )
  
    createCheckboxes = () => (
      this.state.products.map(this.createCheckbox)
    )
  
    render() {
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
  
              <form onSubmit={this.handleFormSubmit}>
                {this.createCheckboxes()}
  
                <button className="btn btn-secondary" type="submit">Создать</button>
              </form>
  
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default CreateOrder;