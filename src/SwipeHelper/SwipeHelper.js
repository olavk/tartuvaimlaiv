import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Swipeable from 'react-swipeable';

const SWIPE_STARTED_AT = 15;
const SWIPE_DONE_AT = 150;

function zeroOrSmaller(x) {
  return x < 0 ? x : 0;
}
function zeroOrLarger(x) {
  return x > 0 ? x : 0;
}

export default class SwipeHelper extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      swipingLeft: false,
      swipingRight: false,
      swipingUp: false,
      swipingDown: false,
    };
    this.handleSwipingBound = this.handleSwiping.bind(this);
    this.handleSwipedBound = this.handleSwiped.bind(this);
  }
  isSwiping() {
    const {
      swipingLeft,
      swipingRight,
      swipingUp,
      swipingDown,
    } = this.state;
    return (
      swipingLeft ||
      swipingRight ||
      swipingUp ||
      swipingDown
    );
  }
  handleSwiping(se, deltaX, deltaY) {
    const {
      canSwipeLeft,
      canSwipeRight,
      onSwipingLeft,
      onSwipingRight,
    } = this.props;
    const {
      swipingLeft,
      swipingRight,
    } = this.state;

    if (!this.isSwiping()) {
      // first handle up and down, which will disable left-right swiping
      if (deltaY < -SWIPE_STARTED_AT) {
        this.setState({swipingUp: true});
      }
      if (deltaY > SWIPE_STARTED_AT) {
        this.setState({swipingDown: true});
      }
      if (canSwipeLeft && deltaX < -SWIPE_STARTED_AT) {
        this.setState({swipingLeft: true});
      }
      if (canSwipeRight && deltaX > SWIPE_STARTED_AT) {
        this.setState({swipingRight: true});
      }
    }
    if (swipingLeft) {
      onSwipingLeft(zeroOrSmaller(deltaX));
    }
    if (swipingRight) {
      onSwipingRight(zeroOrLarger(deltaX));
    }
  }
  handleSwiped(se, deltaX, deltaY, isFlick) {
    const {
      canSwipeLeft,
      canSwipeRight,
      onSwipedLeft,
      onSwipedRight,
      onSwipeFailed,
    } = this.props;

    const {
      swipingLeft,
      swipingRight,
      // swipingUp,
      // swipingDown,
    } = this.state;

    const isLeftSwipe = swipingLeft && deltaX < 0;
    const isRightSwipe = swipingRight && deltaX > 0;
    const isSwipeDone = Math.abs(deltaX) > SWIPE_DONE_AT;

    this.setState({
      swipingLeft: false,
      swipingRight: false,
      swipingUp: false,
      swipingDown: false,
    });

    if (canSwipeLeft && isLeftSwipe && (isSwipeDone || isFlick)) {
      onSwipedLeft();
    } else if (canSwipeRight && isRightSwipe && (isSwipeDone || isFlick)) {
      onSwipedRight();
    } else {
      onSwipeFailed();
    }
  }
  render() {
    return (
      <Swipeable
        onSwiping={this.handleSwipingBound}
        onSwiped={this.handleSwipedBound}
        preventDefaultTouchmoveEvent
      >
        {this.props.children}
      </Swipeable>
    );
  }
}
SwipeHelper.defaultProps = {
  onSwipingLeft: () => {},
  onSwipingRight: () => {},
  onSwipedLeft: () => {},
  onSwipedRight: () => {},
  onSwipeFailed: () => {},
};
SwipeHelper.propTypes = {
  children: PropTypes.node,
  canSwipeLeft: PropTypes.bool,
  canSwipeRight: PropTypes.bool,
  onSwipingLeft: PropTypes.func,
  onSwipingRight: PropTypes.func,
  onSwipedLeft: PropTypes.func,
  onSwipedRight: PropTypes.func,
  onSwipeFailed: PropTypes.func,
};
