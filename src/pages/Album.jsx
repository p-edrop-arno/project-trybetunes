import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    musics: [],
    detailsAlbum: {},
    requisition: true,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.fetchMusics();
    this.getFavoriteSongs();
  }

  getFavoriteSongs = async () => {
    this.setState({
      requisition: false,
    });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
      requisition: true,
    });
  };

  fetchMusics = async () => {
    this.setState({
      requisition: false,
    });
    const {
      match: {
        params: { id },
      } } = this.props;
    const allInfos = await getMusics(id);
    const albumMusics = allInfos.filter((info) => info.trackName);
    this.setState({
      detailsAlbum: allInfos[0],
      musics: albumMusics,
    });
  };

  clickChange = async ({ target }) => {
    const { musics } = this.state;
    const song = musics.find((music) => music.trackId === (+target.name));
    this.setState({
      requisition: false,
    });
    await addSong(song);
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      requisition: true,
      favoriteSongs,
    });
  };

  render() {
    const { detailsAlbum, musics, requisition, isChecked, favoriteSongs } = this.state;
    const detailsAlbums = (
      <section>
        <section>
          <img src={ detailsAlbum.artworkUrl100 } alt="" />
          <h1 data-testid="album-name">{ detailsAlbum.collectionName }</h1>
          <h2 data-testid="artist-name">{ detailsAlbum.artistName }</h2>
        </section>
        <ul>
          {
            musics.map((music) => (
              <MusicCard
                key={ music.trackId }
                music={ music }
                clickChange={ this.clickChange }
                isChecked={ isChecked }
                favoriteSongs={ favoriteSongs }
                favorite={ favoriteSongs
                  .some((song) => song.trackId === music.trackId) }
              />
            ))
          }
        </ul>
      </section>
    );
    return (
      <div data-testid="page-album">
        <Header />
        {
          !requisition
            ? <Loading />
            : detailsAlbums
        }
      </div>

    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
export default Album;
