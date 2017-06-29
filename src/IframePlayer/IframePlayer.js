import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class IframePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleMountBound = this.handleMount.bind(this);
    this.node = null;
    this.document = null;
  }
  handleMount(node) {
    const {contentId} = this.props;
    if (node) {
      setTimeout(() => {
        this.node = node;
        const doc = node.contentWindow.document;
        this.document = doc;
        const scriptElement = doc.createElement('script');

        scriptElement.setAttribute('id', contentId);
        scriptElement.setAttribute('player', 'vjs5');
        scriptElement.setAttribute('autoplay', 'true');
        scriptElement.setAttribute('src', '//player.dacast.com/js/player.js');
        scriptElement.setAttribute('class', 'dacast-video');

        const styleElement = doc.createElement('link');
        styleElement.setAttribute('href', 'dist/style.css');
        styleElement.setAttribute('rel', 'stylesheet');

        const iframeCss = 'html, body {width: 100%; height: 100%;}';
        const iframeStyleElement = doc.createElement('style');

        iframeStyleElement.type = 'text/css';
        if (iframeStyleElement.styleSheet) {
          iframeStyleElement.styleSheet.cssText = iframeCss;
        } else {
          iframeStyleElement.appendChild(doc.createTextNode(iframeCss));
        }

        doc.head.appendChild(styleElement);
        doc.head.appendChild(iframeStyleElement);
        doc.body.setAttribute('class', 'in-iframe');
        doc.body.appendChild(scriptElement);
      }, 32);
    }
  }
  render() {
    const {contentId, title} = this.props;
    return (
      <div className="iframe-player">
        <iframe
          title={contentId}
          ref={this.handleMountBound}
          style={{width: '100%', height: '100%'}}
          width="100%"
          height="100%"
        />
        <div className="player-title">{title}</div>
      </div>
    );
  }
}
IframePlayer.defaultProps = {
  title: '',
};
IframePlayer.propTypes = {
  contentId: PropTypes.string.isRequired,
  title: PropTypes.string,
};
