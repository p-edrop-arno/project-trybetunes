import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    favoriteSongs: [],
    requisition: true,
  };

  componentDidMount() {
    this.fecthFavoritesSong();
  }

  fecthFavoritesSong = async () => {
    this.setState({
      requisition: false,
    });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
      requisition: true,
    });
  };

  clickChange = async ({ target }) => {
    const { favoriteSongs } = this.state;
    const song = favoriteSongs.find((music) => music.trackId === (+target.name));
    this.setState({
      requisition: false,
    });
    await removeSong(song);
    const newFavoritesList = await getFavoriteSongs();
    this.setState({
      favoriteSongs: newFavoritesList,
      requisition: true,
    });
  };

  render() {
    const { favoriteSongs, requisition } = this.state;
    const favorite = true;
    const favoriteList = (
      <ul>
        {
          favoriteSongs.map((music) => (
            <MusicCard
              key={ music.trackId }
              music={ music }
              favoriteSongs={ favoriteSongs }
              favorite={ favorite }
              clickChange={ this.clickChange }
            />
          ))
        }
      </ul>
    );
    return (
      <div data-testid="page-favorites" className="favorites">
        <Header />
        <h1>
          Favorites
        </h1>
        {
          !requisition ? <Loading /> : favoriteList
        }
      </div>
    );
  }
}
export default Favorites;
