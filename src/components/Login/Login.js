import React from 'react';
import './Login.css';
import { authenticationService } from '../../services/authenticationService';
import { withRouter } from "react-router-dom";


// export default function Login() {
class Login extends React.Component {
  // const [username, setUserName] = useState();
  // const [password, setPassword] = useState();

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   authenticationService.login({
  //     'login': username,
  //     'password': password
  //   });
  //   // setToken(token);
  // }

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // redirect to home if already logged in
    if (authenticationService.currentTokenValue) { 
        this.props.history.push('/orders');
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    authenticationService.login({
      'login': username,
      'password': password
    });
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    this.props.history.push(from);
    // this.props.history.push('/orders')
    // setToken(token);
  }

  render() {
  const { username, password} = this.state;
  return(
    <div className="col-md-4 col-md-offset-4">
      <h3 className=" text-muted">Войдите в систему</h3>
      <form className="justify-content-center" onSubmit={this.handleSubmit}>
        <div className="form-row">
      <div className="form-floating d-inline-flex p-2">
        <input type="text" name="username" value={username} onChange={this.handleChange} className="col-auto form-control" id="floatingInput" placeholder="Login"/>
        <label htmlFor="floatingInput">Логин</label>
      </div>
      </div>
      <div className="form-row">
        <div className="form-floating d-inline-flex p-2">
        <input type="password" name="password" value={password} onChange={this.handleChange} className="form-control" id="floatingPassword" placeholder="Password"/>
          <label htmlFor="floatingPassword">Пароль</label>
      </div>
      </div>
        <div>
          <button className="btn btn-secondary" type="submit">Войти</button>
        </div>
      </form>
    </div>
  );
  }
}

export default withRouter(Login);

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// };