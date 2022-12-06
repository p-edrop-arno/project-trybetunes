import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    picture: '',
    description: '',
    requisition: true,
    buttonBlock: true,
    saved: false,
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
      name: user.name,
      email: user.email,
      picture: user.image,
      description: user.description,
      requisition: true,
    }, () => {
      this.validateButton();
    });
  };

  validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  validateButton = () => {
    const { email, name, description, picture } = this.state;
    const isValidEmail = this.validateEmail(email);
    const isValid = name.length > 0
      && email.length > 0
      && description.length > 0
      && picture.length > 0;
    if (isValid && isValidEmail) {
      this.setState({
        buttonBlock: false,
      });
    }
  };

  salverUser = async () => {
    const { name, email, picture, description } = this.state;
    const userInfo = {
      name: name,
      email: email,
      image: picture,
      description: description,
    };
    this.setState({
      requisition: false,
    });
    await updateUser(userInfo);
    this.setState({
      saved: true,
      requisition: true,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.validateButton();
    });
  };

  render() {
    const {
      name,
      email,
      picture,
      description,
      requisition,
      buttonBlock,
      saved,
    } = this.state;
    const editForm = (
      <form>
        <label htmlFor="name">
          Nome:
          <input
            name="name"
            id="name"
            type="name"
            data-testid="edit-input-name"
            value={name}
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            id="email"
            data-testid="edit-input-email"
            value={email}
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <textarea
            name="description"
            id="description"
            data-testid="edit-input-description"
            value={description}
            onChange={this.handleChange}
          />
        </label>
        <label htmlFor="picture">
          Foto de Perfil:
          <input
            type="text"
            name="picture"
            id="name"
            data-testid="edit-input-image"
            value={picture}
            onChange={this.handleChange}
          />
        </label>
        <button
          type="button"
          data-testid="edit-button-save"
          disabled={buttonBlock}
          onClick={this.salverUser}
        >
          Salvar
        </button>
      </form>
    );
    return (
      <div data-testid="page-profile-edit" className="profile-edit">
        <Header />
        {!requisition ? <Loading /> : editForm}
        {saved && <Redirect to="/profile" />}
      </div>
    );
  }
}
export default ProfileEdit;
