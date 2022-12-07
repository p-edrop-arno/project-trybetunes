import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    client: '',
    successfulRequisition: false,
  };

  async componentDidMount() {
    const usrName = await this.fetchName();
    this.setState({
      client: usrName,
      successfulRequisition: true,
    });
  }

  fetchName = async () => {
    const name = await getUser();
    return name.name;
  };

  render() {
    const { client, successfulRequisition } = this.state;
    return (
      <header data-testid="header-component">
        <nav>
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
        {successfulRequisition ? <h1 data-testid="header-user-name">{client}</h1>
          : <Loading />}
      </header>
    );
  }
}
export default Header;
