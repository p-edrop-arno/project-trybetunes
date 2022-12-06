import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  state = {
    favorited: false,
  };

  componentDidMount() {
    this.setFavorite();
  }

  setFavorite = () => {
    const { favorite } = this.props;
    this.setState({
      favorited: favorite,
    });
  };

  render() {
    const { favorited } = this.state;
    const {
      music,
      clickChange,
    } = this.props;
    const {
      trackName,
      previewUrl,
      trackId,
    } = music;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="checkbox-music">
          <input
            id="checkbox-music"
            name={ trackId }
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ clickChange }
            checked={ favorited }
          />
        </label>
      </div>
    );
  }
}
MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.string.isRequired,
  }).isRequired,
  clickChange: PropTypes.func.isRequired,
  favorite: PropTypes.bool.isRequired,
};

export default MusicCard;
