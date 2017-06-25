import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import leftImage from '../images/left.png';
import rightImage from '../images/right.png';

const HIDE_DELAY_MS = 2000;
const showTriggerEvents = [
  'mousemove',
  'touchstart',
];

export default class SwipeGalleryButtons extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      doNotHide: false,
    };
    this.node = null;
    this.hideTimeout = null;
    this.hideBound = this.hide.bind(this);
    this.handleMountBound = this.handleMount.bind(this);
    this.showForAWhileBound = this.showForAWhile.bind(this);
    this.setDoNotHideBound = this.setDoNotHide.bind(this);
    this.setDoHideBound = this.setDoHide.bind(this);
  }
  componentWillUnmount() {
    this.removeListeners();
  }
  handleMount(node) {
    if (node != null) {
      this.node = node;
      this.addListeners();
    }
  }
  addListeners() {
    for (let i = 0; i < showTriggerEvents.length; i++) {
      const eventName = showTriggerEvents[i];
      window.addEventListener(eventName, this.showForAWhileBound);
    }
  }
  removeListeners() {
    for (let i = 0; i < showTriggerEvents.length; i++) {
      const eventName = showTriggerEvents[i];
      window.removeEventListener(eventName, this.showForAWhileBound);
    }
  }
  setDoNotHide() {
    clearTimeout(this.hideTimeout);
    this.setState({
      doNotHide: true,
    });
  }
  setDoHide() {
    this.setState({
      doNotHide: false,
    });
    this.hideTimeout = setTimeout(this.hideBound, HIDE_DELAY_MS);
  }
  show() {
    this.setState({
      hidden: false,
    });
  }
  hide() {
    this.setState({
      hidden: true,
    });
  }
  showForAWhile() {
    if (this.state.hidden) {
      this.show();
    }
    clearTimeout(this.hideTimeout);
    if (!this.state.doNotHide) {
      this.hideTimeout = setTimeout(this.hideBound, HIDE_DELAY_MS);
    }
  }
  render() {
    const {
      showLeftButton,
      showRightButton,
      onClickedLeft,
      onClickedRight,
    } = this.props;
    const {hidden} = this.state;
    return (
      <div
        className={cx('swipe-gallery-buttons', {hidden})}
        ref={this.handleMountBound}
        // onMouseEnter={this.setDoNotHideBound}
        // onMouseLeave={this.setDoHideBound}
        // onTouchEnd={this.setDoHideBound}
      >
        {!!showLeftButton && (
          <button className="swipe-button swipe-button-left" onClick={onClickedLeft}>
            <img src={leftImage} alt="left button" />
          </button>
        )}
        {!!showRightButton && (
          <button className="swipe-button swipe-button-right" onClick={onClickedRight}>
            <img src={rightImage} alt="right button" />
          </button>
        )}
      </div>
    );
  }
}
SwipeGalleryButtons.defaultProps = {
};
SwipeGalleryButtons.propTypes = {
  showLeftButton: PropTypes.bool,
  showRightButton: PropTypes.bool,
  onClickedLeft: PropTypes.func.isRequired,
  onClickedRight: PropTypes.func.isRequired,
};
