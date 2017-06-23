import React from 'react';
import PropTypes from 'prop-types';
import image from '../../images/small-play-06.png';

const PlayButton = props => {
  const {children, ...otherProps} = props;
  return (
    <button className="play-button" {...otherProps}>
      {children}
      <img className="play-icon" src={image} alt="play button" />
    </button>
  );
};
PlayButton.propTypes = {
  children: PropTypes.node,
};
export default PlayButton;
