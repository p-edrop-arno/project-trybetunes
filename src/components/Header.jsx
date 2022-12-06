import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    user: '',
    loading: true,
  };

  async componentDidMount() {
    const response = await getUser();
    const { name } = response;
    this.setState({
      user: name,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;

    return (
      <header data-testid="header-component">
        {loading ? (<div> Carregando...</div>)
          : (<div data-testid="header-user-name">{user}</div>)}
        <nav>
          <Link data-testid="link-to-search" to="/search">search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">search</Link>
          <Link data-testid="link-to-profile" to="/profile">search</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
