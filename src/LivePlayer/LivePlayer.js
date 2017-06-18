import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';

const Player = window.dacast;
if (!Player) {
  throw new Error('global window.dacast must be defined');
}
const playerOptions = {
  player: 'vjs5',
};

export default class LivePlayer extends PureComponent {
  constructor(props) {
    super(props);
    this.handleMountBound = this.handleMount.bind(this);
    this.node = null;
    this.player = null;
  }
  componentWillReceiveProps(nextProps) {
    const currPlay = this.props.play;
    const nextPlay = nextProps.play;
    if (this.player) {
      if (currPlay && !nextPlay) {
        this.player.pause();
      }
      if (!currPlay && nextPlay) {
        this.player.play();
      }
    }
  }
  handleMount(node) {
    if (node != null) {
      this.node = node;
      const playerInstance = Player(this.props.contentId, node, playerOptions);
      playerInstance.onReady(this.handlePlayerReady.bind(this, playerInstance));
    }
  }
  handlePlayerReady(playerInstance) {
    console.log('handlePlayerReady', playerInstance);
    this.player = playerInstance;
    if (this.props.play) {
      this.player.play();
    }
    this.player.volume(0);
  }
  render() {
    return (
      <div ref={this.handleMountBound} />
    );
  }
}
LivePlayer.defaultProps = {
  play: false,
};
LivePlayer.propTypes = {
  contentId: PropTypes.string.isRequired,
  play: PropTypes.bool,
};
