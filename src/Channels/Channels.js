import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push as _pushState} from 'react-router-redux';
import {setIndex} from 'modules/channels/actions';
// import LivePlayer from '../LivePlayer/LivePlayerOverlayed';
import IframePlayerOverlayed from '../IframePlayer/IframePlayerOverlayed';
import SwipeGallery from '../SwipeGallery/SwipeGallery';
// 41779_c_52115
// 20599_l_441345

// channels
// 1 92417_c_442866
// 2 92417_c_442867

// http://2.bp.blogspot.com/-AXkkbmFRErs/TjCZIWGawfI/AAAAAAAAAlk/lT8yTGBYh38/s1600/Rick-Roll3.png
// https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/01/07/12/Rick-Roll-Mash-Up.jpg
// http://media.salon.com/2015/04/Screen-Shot-2015-04-08-at-6.19.59-PM.png
// https://img.wonderhowto.com/img/05/67/63388558293762/0/rick-roll.1280x600.jpg

const contentIds = [
  '92417_c_442866',
  '92417_c_442867',
];

class Channels extends PureComponent {
  constructor(props) {
    super(props);
    this.handleGalleryClickLeftBound = this.handleGalleryClickLeft.bind(this);
    this.handleGalleryClickRightBound = this.handleGalleryClickRight.bind(this);
  }
  isInView() {
    const {location} = this.props;
    return location === '/channels';
  }
  renderChildren() {
    const {channelIndex} = this.props;
    /*
    const children = [
      <LivePlayer key="1" contentId="92417_c_442866" play={this.isInView() && channelIndex === 0} />,
      <LivePlayer key="2" contentId="92417_c_442867" play={this.isInView() && channelIndex === 1} />,
    ];
    */
    const children = contentIds.map((contentId, contentIdIndex) => {
      if (this.isInView() && channelIndex === contentIdIndex) {
        /*
        return (
          <LivePlayer
            key={contentId}
            contentId={contentId}
            play
          />
        );
        */
        return (
          <IframePlayerOverlayed key={contentId} contentId={contentId} />
        );
      }
      return (
        <div key={contentId} className="player-placeholder" />
      );
    });
    return children;
    // return [];
  }
  handleGalleryClickLeft() {
    const {setChannelIndex, channelIndex, pushState} = this.props;
    if (channelIndex === 0) {
      pushState('/');
    } else {
      setChannelIndex(channelIndex - 1);
    }
  }
  handleGalleryClickRight() {
    const {setChannelIndex, channelIndex} = this.props;
    setChannelIndex(channelIndex + 1);
  }
  render() {
    const {
      channelIndex,
      setChannelIndex,
    } = this.props;
    return (
      <div>
        <SwipeGallery
          childIndex={channelIndex}
          onSwipedLeft={() => setChannelIndex(channelIndex - 1)}
          onSwipedRight={() => setChannelIndex(channelIndex + 1)}
          onClickedLeft={this.handleGalleryClickLeftBound}
          onClickedRight={this.handleGalleryClickRightBound}
        >
          {this.renderChildren()}
        </SwipeGallery>
      </div>
    );
  }
}
Channels.propTypes = {
  pushState: PropTypes.func.isRequired,
  channelIndex: PropTypes.number.isRequired,
  setChannelIndex: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
};
export default connect(
  state => ({
    channelIndex: state.channels.channelIndex,
    location: state.router.location ? state.router.location.pathname : '',
  }),
  {
    pushState: _pushState,
    setChannelIndex: setIndex,
  },
)(Channels);
