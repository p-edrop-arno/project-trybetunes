import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumCard from '../components/AlbumCard';

class Search extends Component {
  state = {
    searching: '',
    artistName: '',
    albuns: [],
    buttonBlock: true,
  };

  handleChangle = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      if (value.length >= 2) {
        this.setState({
          buttonBlock: false,
        });
      } else {
        this.setState({
          buttonBlock: true,
        });
      }
    });
  };

  searching = async () => {
    const { searching } = this.state;
    this.setState({
      searching: '',
      albuns: [],
      artistName: searching,
    });
    const fetchAlbuns = await searchAlbumsAPI(searching);
    this.setState({
      albuns: fetchAlbuns,
    });
  };

  render() {
    const { buttonBlock, searching, albuns, artistName } = this.state;
    return (
      <div data-testid="page-search" className="search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            name="searching"
            value={ searching }
            onChange={ this.handleChangle }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ buttonBlock }
            onClick={ this.searching }
          >
            Pesquisar
          </button>
        </form>
        <section>
          <h2>{`Resultado de álbuns de: ${artistName}`}</h2>
        </section>
        <ul>
          {
            albuns.length === 0
              ? <p>Nenhum álbum foi encontrado</p>
              : albuns.map((album) => (
                <AlbumCard
                  key={ album.collectionId }
                  artworkUrl100={ album.artworkUrl100 }
                  collectionName={ album.collectionName }
                  artistName={ album.artistName }
                  collectionId={ album.collectionId }
                />
              ))
          }
        </ul>
      </div>
    );
  }
}

export default Search;
