import React, { Component } from 'react';
import { history } from '../../services/history';

class CreateProduct extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          categories: [],
          product_name: '',
          price: 0,
          category_id: 0
        };
    
        this.getCategories = this.getCategories.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    async handleSubmit(e) {
        e.preventDefault();
        const { product_name, price, category_id } = this.state;
        // console.log(product_name);
        // console.log(price);
        // console.log(category_id);
        // console.log(JSON.stringify({
        //             'product_name': product_name,
        //             'price': parseFloat(price),
        //             'category_id': parseInt(category_id)}
        //             ));
        const res = await fetch('/api/products', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'product_name': product_name,
                'price': parseFloat(price),
                'category_id': parseInt(category_id)}
                )
          })
          if (res.status !== 200) {
            console.log(res.status);
            return new Error('Something went wrong');
        }   
        history.push('/products');
         
    }
    

    async componentDidMount() {
        const categories = await this.getCategories();
        this.setState({categories: categories});
    }  

    async getCategories() {
        const res = await fetch(`/api/categories`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        return data;
    }  

    render() {
    const { product_name, price, category_id } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
            <h3>Создайте новый товар</h3>

            <div className="mb-3">
                <label className="form-label">Название товара:</label>
            <input className="form-control" type="text" name="product_name" value={product_name} onChange={this.handleChange}/>
            </div>
            <label className="form-label">Категория:</label>
            <select className="form-select" name="category_id" required value={category_id} onChange={this.handleChange}>
                <option value="">Выберите категорию</option>
                {this.state.categories.map(c => <option value={c.category_id} key={c.category_id}>{c.name}</option>)}
            </select>
            <div className="mb-3">
            <label className="form-label">Цена:</label>
            <input className="form-control" type="number" min="0" step="0.01" name="price" value={price} onChange={this.handleChange}/>
            </div>
            <button className="btn btn-secondary" type="submit">Submit</button>
            </form>
        );
    }
}

export default CreateProduct;