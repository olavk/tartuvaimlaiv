import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import IframePlayer from '../IframePlayer/IframePlayer';
import SwipeGallery from '../SwipeGallery/SwipeGallery';

class Presentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  renderChildren() {
    const {channels} = this.props;
    const backup = [{
      contentId: '92417_f_422332',
      title: 'Tartu',
    }];
    const withBackup = channels.concat(backup);
    const children = withBackup.map(channel => {
      const {contentId, title} = channel;
      return (
        <IframePlayer
          key={contentId}
          contentId={contentId}
          title={title}
        />
      );
    });
    return children;
  }
  render() {
    const {
      channelIndex,
    } = this.props;
    return (
      <div>
        <SwipeGallery childIndex={channelIndex}>
          {this.renderChildren()}
        </SwipeGallery>
      </div>
    );
  }
}
Presentation.defaultProps = {
};
Presentation.propTypes = {
  channels: PropTypes.array.isRequired,
  channelIndex: PropTypes.number.isRequired,
};

export default connect(
  state => ({
    channels: state.channels.list,
    channelIndex: state.channels.channelIndex,
  }),
)(Presentation);
