import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push as _pushState} from 'react-router-redux';
import {setIndex} from 'modules/channels/actions';
import IframePlayer from '../IframePlayer/IframePlayer';
import SwipeGallery from '../SwipeGallery/SwipeGallery';

// channels
// 01 92417_c_442866
// 02 92417_c_442867
// 03 92417_c_444398
// 04 92417_c_444399
// 05 92417_c_444400
// 06 92417_c_444401
// 07 92417_c_444402
// 08 92417_c_444403
// 09 92417_c_444404
// 10 92417_c_444405

const contentIds = [
  '92417_f_422332', // backup
  '92417_c_442866', // 1
  '92417_c_442867', // 2
  '92417_c_444398', // 3
  '92417_c_444399', // 4
  '92417_c_444400', // 5
  '92417_c_444401', // 6
  '92417_c_444402', // 7
  '92417_c_444403', // 8
  '92417_c_444404', // 9
  '92417_c_444405', // 10
];
const titles = [
  'Tartu',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
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
    const children = contentIds.map((contentId, contentIdIndex) => {
      if (this.isInView() && channelIndex === contentIdIndex) {
        return (
          <IframePlayer
            key={contentId}
            contentId={contentId}
            title={titles[contentIdIndex]}
          />
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
