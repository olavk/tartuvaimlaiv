import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import history from 'utils/history';
import {ConnectedRouter, push as _pushLocation} from 'react-router-redux';
import {Route} from 'react-router';
// import LivePlayer from '../LivePlayer/LivePlayerOverlayed';
import cx from 'classnames';
import SwipeHelper from '../SwipeHelper/SwipeHelper';
import Home from '../Sections/Home';
import Channels from '../Channels/Channels';

// const ANIMATION_DURATION = 250;
const noop = () => {};
// 41779_c_52115 mexican feed
// 20599_l_441345 another feed
// 90855_c_439362 test
// 92417_c_442866 1
// <LivePlayer contentId="41779_c_52115" />
class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      swipeAmount: 0,
      animates: true,
    };
    this.animationTimeout = null;
    this.renderInnerBound = this.renderInner.bind(this);
    this.setSwipeAmountBound = this.setSwipeAmount.bind(this);
    this.handleSwipingRightBound = this.handleSwipingRight.bind(this);
    this.handleSwipedRightBound = this.handleSwipedRight.bind(this);
    this.handleSwipingLeftBound = this.handleSwipingLeft.bind(this);
    this.handleSwipedLeftBound = this.handleSwipedLeft.bind(this);
    this.handleSwipeFailedBound = this.handleSwipeFailed.bind(this);
  }
  setSwipeAmount(swipeAmount) {
    this.setState({swipeAmount});
  }
  handleSwipingRight(swipeAmount) {
    this.disableAnimate();
    this.setSwipeAmount(swipeAmount);
  }
  handleSwipedRight() {
    this.enableAnimate(() => {
      this.setSwipeAmount(0);
      this.props.pushLocation('/channels');
    });
  }
  handleSwipingLeft(swipeAmount) {
    this.disableAnimate();
    this.setSwipeAmount(swipeAmount);
  }
  handleSwipedLeft() {
    this.enableAnimate(() => {
      this.setSwipeAmount(0);
      this.props.pushLocation('/');
    });
  }
  handleSwipeFailed() {
    this.enableAnimate(() => {
      this.setSwipeAmount(0);
    });
  }
  enableAnimate(_cb) {
    const cb = _cb || noop;
    if (this.state.animates !== true) {
      this.setState({
        animates: true,
      }, cb);
    } else {
      cb();
    }
  }
  disableAnimate(_cb) {
    const cb = _cb || noop;
    if (this.state.animates !== false) {
      this.setState({
        animates: false,
      }, cb);
    } else {
      cb();
    }
  }
  getStyle() {
    const style = {};
    const {location} = this.props;
    const {swipeAmount} = this.state;
    const offset = location === '/channels' ? '-100%' : '0%';
    if (swipeAmount) {
      style.marginLeft = 'calc(' + offset + ' - (' + swipeAmount + 'px))';
    }
    // style.marginLeft = 'calc(0% - (-1px))';
    return style;
  }
  renderInner(routeArgs) {
    // this is always rendered, but "match" changes
    const {match} = routeArgs;
    const {channelIndex} = this.props;
    const {animates} = this.state;
    const className = cx('main-container', {
      'channels-mode': match,
      animates,
    });
    return (
      <div className={className} style={this.getStyle()}>
        <div className="channels">
          <SwipeHelper
            canSwipeLeft={channelIndex === 0}
            onSwipingLeft={this.handleSwipingLeftBound}
            onSwipedLeft={this.handleSwipedLeftBound}
            onSwipeFailed={this.handleSwipeFailedBound}
          >
            <Channels />
          </SwipeHelper>
        </div>
        <div className="sections">
          <SwipeHelper
            canSwipeRight
            onSwipingRight={this.handleSwipingRightBound}
            onSwipedRight={this.handleSwipedRightBound}
            onSwipeFailed={this.handleSwipeFailedBound}
          >
            <Home />
          </SwipeHelper>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div>
        <ConnectedRouter history={history}>
          <Route
            path="/channels"
            children={this.renderInnerBound} // eslint-disable-line
          />
        </ConnectedRouter>
      </div>
    );
  }
}

// <Route exact path="/channels" component={Channels} />

App.defaultProps = {
};
App.propTypes = {
  pushLocation: PropTypes.func.isRequired,
  channelIndex: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
};

function makeMapStateToProps() {
  return state => ({
    channelIndex: state.channels.channelIndex,
    location: state.router.location ? state.router.location.pathname : '',
  });
}

export default connect(
  makeMapStateToProps,
  {
    pushLocation: _pushLocation,
  }
)(App);
