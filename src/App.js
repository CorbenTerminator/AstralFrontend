import './App.css';
import React from 'react';
import { Router, Route, Switch, Link} from 'react-router-dom';
import Login from './components/Login/Login';
import ListOrders from './components/ListOrders/ListOrders';
import CreateOrder from './components/CreateOrder/CreateOrder';
import ListProducts from './components/ListProducts/ListProducts';
import CreateProduct from './components/CreateProduct/CreateProduct';
import {PrivateRoute} from './components/PrivateRoute/PrivateRoute';
import { history } from './services/history';
import { authenticationService } from './services/authenticationService'


class App extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
        currentToken: null
    };
  }

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      authenticationService.currentToken.subscribe(x => this.setState({ currentToken: x }));
    }
    
  }

  logout() {
    authenticationService.logout();
    history.push('/login');
  }

  // const [token, setToken] = useState();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

  render() {
    const { currentToken } = this.state;
    return (
    <div className="container-fluid">
      <Router history={history}>
        {currentToken &&
                        <nav className="navbar navbar-expand navbar-dark bg-secondary">
                            <div className="navbar-nav">
                                {/* <Link to="/" className="navbar-brand mx-auto">Приложение</Link> */}
                                <Link to="/orders" className="nav-item nav-link">Заказы</Link>
                                <Link to="/products" className="nav-item nav-link">Товары</Link>
                                <a onClick={this.logout} className="nav-item nav-link ml-auto">Выйти</a>
                            </div>
                        </nav>
                    }
        <Switch>
        <PrivateRoute exact path="/orders" component={ListOrders} />
        <PrivateRoute exact path="/order" component={CreateOrder} />
        <PrivateRoute exact path="/products" component={ListProducts} />
        <PrivateRoute exact path="/product" component={CreateProduct} />
        <Route path="/login">
            <Login />
        </Route> 
        </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
