import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    description: '',
    email: '',
    name: '',
    picture: '',
    requisition: true,
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    this.setState({
      requisition: false,
    });
    const user = await getUser();
    this.setState({
      description: user.description,
      email: user.email,
      name: user.name,
      picture: user.image,
      requisition: true,
    });
  };

  render() {
    const { name, email, description, picture, requisition } = this.state;

    const profileInfos = (
      <section className="profile-Infos">
        <h4>Nome:</h4>
        <p>{ name }</p>
        <h4>Email:</h4>
        <p>{ email }</p>
        <h4>Descrição</h4>
        <p>{ description }</p>
        <img src={ picture } alt="Foto do usuário" data-testid="profile-image" />
        <Link to="/profile/edit">Editar perfil</Link>
      </section>
    );

    return (
      <div data-testid="page-profile" className="Profile">
        <Header />
        {
          !requisition ? <Loading /> : profileInfos
        }
      </div>
    );
  }
}
export default Profile;
