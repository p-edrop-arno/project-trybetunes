import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Login extends Component {
    state = {
        login: '',
        loading: false,
        searchPage: false,
    };

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({
            [name]: value,
        }, () => {
            this.disableButton(value);
        });
    };

    handleSubmit = async () => {
        const { login } = this.state;
        this.setState({
            loading: true,
        });
        await createUser({ name: login });
        this.setState({
            loading: false,
            searchPage: true,
        });
    };

    disableButton = () => {
        const characters = 3;
        const { login } = this.state;
        return (login.length >= characters);
    };

    render() {
        const { login, loading, searchPage } = this.state;

        return (
            <div data-testid="page-login">
                {loading === true ? (<Loading />) : (
                    <form>
                        <label htmlFor="nome">
                            Nome
                            <input
                                type="text"
                                data-testid="login-name-input"
                                name="login"
                                value={login}
                                onChange={this.handleChange}
                            />
                        </label>
                        <button
                            type="button"
                            data-testid="login-submit-button"
                            onClick={this.handleSubmit}
                            disabled={!this.disableButton()}
                        >
                            Entrar
                        </button>
                    </form>
                )}
                {searchPage && <Redirect to="/search" />}
            </div>
        );
    }
}

export default Login;
