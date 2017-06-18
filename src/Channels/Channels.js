import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push as _pushState} from 'react-router-redux';
import {setIndex} from 'modules/channels/actions';
import LivePlayer from '../LivePlayer/LivePlayerOverlayed';
import SwipeGallery from '../SwipeGallery/SwipeGallery';
// 41779_c_52115
// 20599_l_441345

// http://2.bp.blogspot.com/-AXkkbmFRErs/TjCZIWGawfI/AAAAAAAAAlk/lT8yTGBYh38/s1600/Rick-Roll3.png
// https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/01/07/12/Rick-Roll-Mash-Up.jpg
// http://media.salon.com/2015/04/Screen-Shot-2015-04-08-at-6.19.59-PM.png
// https://img.wonderhowto.com/img/05/67/63388558293762/0/rick-roll.1280x600.jpg

class Channels extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dis: {
        0: true,
        1: true,
        2: true,
        3: true,
        4: true,
      },
    };
  }
  renderChildren() {
    const {dis} = this.state;
    console.log('dis', dis);
    const children = [
      <div onClick={() => this.setState({dis: Object.assign({}, dis, {0: !dis[0]})})}><LivePlayer contentId="20599_l_441345" /></div>,
      <div onClick={() => this.setState({dis: Object.assign({}, dis, {1: !dis[1]})})}><img alt="" src="http://2.bp.blogspot.com/-AXkkbmFRErs/TjCZIWGawfI/AAAAAAAAAlk/lT8yTGBYh38/s1600/Rick-Roll3.png" /></div>,
      <div onClick={() => this.setState({dis: Object.assign({}, dis, {2: !dis[2]})})}><img alt="" src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/01/07/12/Rick-Roll-Mash-Up.jpg" /></div>,
      <div onClick={() => this.setState({dis: Object.assign({}, dis, {3: !dis[3]})})}><img alt="" src="http://media.salon.com/2015/04/Screen-Shot-2015-04-08-at-6.19.59-PM.png" /></div>,
      <div onClick={() => this.setState({dis: Object.assign({}, dis, {4: !dis[4]})})}><img alt="" src="https://img.wonderhowto.com/img/05/67/63388558293762/0/rick-roll.1280x600.jpg" /></div>,
    ];
    return children.filter((child, i) => !!dis[i]);
  }
  render() {
    const {
      channelIndex,
      setChannelIndex,
    } = this.props;
    return (
      <div>
        <h2>Channels</h2>
        <a onClick={() => this.props.pushState('/')}>Home</a>
        <button onClick={() => this.setState({
          dis: {
            0: true,
            1: true,
            2: true,
            3: true,
            4: true,
          }
        })}>reset</button>
        <SwipeGallery
          childIndex={channelIndex}
          onSwipedRight={() => setChannelIndex(channelIndex + 1)}
          onSwipedLeft={() => setChannelIndex(channelIndex - 1)}
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
};
export default connect(
  state => ({
    channelIndex: state.channels.channelIndex,
  }),
  {
    pushState: _pushState,
    setChannelIndex: setIndex,
  },
)(Channels);
