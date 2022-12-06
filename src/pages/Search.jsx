import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    artist: '',
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      artist: value,
    });
  };

  render() {
    const { artist } = this.state;
    const characters = 2;

    return (
            <div data-testid="page-search">
                  <Header />
        <form className="form">
          <label htmlFor="search-artist-input">
            Nome
            <input
              type="text"
              data-testid="search-artist-input"
              name="artistname"
              value={ artist }
              placeholder="nome do artista"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            name="artistbutton"
            id="artistbutton"
            disabled={ artist.length < characters }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
export default Search;
