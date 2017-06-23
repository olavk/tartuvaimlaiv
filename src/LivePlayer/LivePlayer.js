import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';

const READY_DELAY_MS = 500;
const PLAY_DELAY_MS = 500;

const Player = window.dacast;
if (!Player) {
  throw new Error('global window.dacast must be defined');
}
const playerOptions = {
  player: 'vjs5',
  // player: 'html5hls',
  // player: 'html5native',
};

export default class LivePlayer extends PureComponent {
  constructor(props) {
    super(props);
    this.handleMountBound = this.handleMount.bind(this);
    this.node = null;
    this.player = null;
    this.readyTimeout = null;
    this.playTimeout = null;
  }
  componentWillReceiveProps(nextProps) {
    const currPlay = this.props.play;
    const nextPlay = nextProps.play;
    if (this.player) {
      if (currPlay && !nextPlay) {
        this.delayPause();
      }
      if (!currPlay && nextPlay) {
        this.delayPlay();
      }
    }
  }
  componentWillUnmount() {
    clearTimeout(this.playTimeout);
    clearTimeout(this.readyTimeout);
    if (this.player) {
      this.player.stop();
      this.player.dispose();
    }
  }
  delayPlay() {
    clearTimeout(this.playTimeout);
    setTimeout(this.player.play, PLAY_DELAY_MS);
  }
  delayPause() {
    clearTimeout(this.playTimeout);
    setTimeout(this.player.pause, PLAY_DELAY_MS);
  }
  delayPlayerReady(playerInstance) {
    clearTimeout(this.readyTimeout);
    setTimeout(this.handlePlayerReady.bind(this, playerInstance), READY_DELAY_MS);
  }
  handleMount(node) {
    if (node != null) {
      this.node = node;
      const playerInstance = Player(this.props.contentId, node, playerOptions);
      playerInstance.onReady(this.delayPlayerReady.bind(this, playerInstance));
    }
  }
  handlePlayerReady(playerInstance) {
    console.log('PLAYER READY?', playerInstance.ready());
    this.player = playerInstance;
    if (this.props.play) {
      this.delayPlay();
    }
    this.player.volume(0);
  }
  render() {
    return (
      <div className="live-player" ref={this.handleMountBound} />
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
