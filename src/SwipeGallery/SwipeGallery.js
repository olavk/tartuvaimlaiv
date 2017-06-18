import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import cx from 'classnames';
import SwipeHelper from '../SwipeHelper/SwipeHelper';

function isAtFirstChild(childIndex) {
  return childIndex === 0;
}
function isAtLastChild(childIndex, children) {
  return childIndex === children.length - 1;
}
// function isAtMiddleChild(childIndex, children) {
//   return isAtFirstChild(childIndex) && isAtLastChild(childIndex, children);
// }
function getChildrenSlice(children, childIndex) {
  const array = React.Children.toArray(children);
  let slice;
  if (isAtFirstChild(childIndex)) {
    // index at first child
    slice = array.slice(0, 2);
  } else if (isAtLastChild(childIndex, children)) {
    // index at last child
    slice = array.slice(-2);
  } else {
    // any other child index
    slice = array.slice(childIndex - 1, childIndex + 2);
  }
  return slice;
}
function getChildAt(children, index) {
  return React.Children.toArray(children)[index];
}
function shouldAnimateToRight(prevProps, nextProps) {
  return prevProps.childIndex < nextProps.childIndex;
}
function getAnimationChildren(prevProps, nextProps) {
  const prevChild = getChildAt(prevProps.children, prevProps.childIndex);
  const nextChild = getChildAt(nextProps.children, nextProps.childIndex);
  if (shouldAnimateToRight(prevProps, nextProps)) {
    return [prevChild, nextChild];
  }
  return [nextChild, prevChild];
}

export default class SwipeGallery extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      swipeFactor: 0,
      animationChildren: null,
      animationDirection: null,
    };
    this.node = null;
    this.wrapperNode = null;
    this.handleMountBound = this.handleMount.bind(this);
    this.handleWrapperMountBound = this.handleWrapperMount.bind(this);
    this.handleSwipingBound = this.handleSwiping.bind(this);
    this.handleSwipedRightBound = this.handleSwipedRight.bind(this);
    this.handleSwipedLeftBound = this.handleSwipedLeft.bind(this);
    this.handleSwipeFailedBound = this.handleSwipeFailed.bind(this);
    this.handleTransitionEndBound = this.handleTransitionEnd.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const indexDiff = this.props.childIndex !== nextProps.childIndex;
    const childrenDiff = this.props.children !== nextProps.children;
    if (indexDiff || childrenDiff) {
      const animationChildren = getAnimationChildren(this.props, nextProps);
      const animationDirection = shouldAnimateToRight(this.props, nextProps) ? 'right' : 'left';
      this.setState({
        animationChildren,
        animationDirection,
      });
    }
  }
  componentWillUnmount() {
    if (this.wrapperNode) {
      this.wrapperNode.removeEventListener('transitionend', this.handleTransitionEndBound);
    }
  }
  getCount() {
    const {children} = this.props;
    if (!children) return 0;
    if (!children.length) return 0;
    return children.length;
  }
  getContainerWidth() {
    if (this.node == null) return null;
    return this.node.clientWidth;
  }
  getWrapperStyle() {
    const {swipeFactor, animationDirection} = this.state;
    let swipePercent;
    if (this.animationPending()) {
      if (animationDirection === 'right') {
        swipePercent = '-100%';
      } else {
        swipePercent = '100%';
      }
    } else {
      swipePercent = (-swipeFactor * 100) + '%';
    }
    return {
      marginLeft: swipePercent,
    };
  }
  setSwipeFactor(swipeFactor) {
    this.setState({swipeFactor});
  }
  handleMount(node) {
    this.node = node;
  }
  handleWrapperMount(node) {
    this.wrapperNode = node;
    node.addEventListener('transitionend', this.handleTransitionEndBound);
  }
  handleTransitionEnd() {
    this.setState({
      swipeFactor: 0,
      animationChildren: null,
      animationDirection: null,
    });
  }
  handleSwiping(deltaX) {
    if (this.node != null) {
      const swipeFactor = deltaX / this.getContainerWidth();
      this.setSwipeFactor(swipeFactor);
    }
  }
  handleSwipedRight() {
    // this.setSwipeFactor(0);
    const {onSwipedRight} = this.props;
    onSwipedRight();
  }
  handleSwipedLeft() {
    // this.setSwipeFactor(0);
    const {onSwipedLeft} = this.props;
    onSwipedLeft();
  }
  handleSwipeFailed() {
    this.setSwipeFactor(0);
  }
  animationPending() {
    return this.state.animationChildren !== null;
  }
  renderAnimationChildren() {
    const {animationChildren, animationDirection} = this.state;
    if (animationDirection === 'right') {
      return [(
        <div className="swipe-gallery-child" style={{left: 0}} key={0}>
          {animationChildren[0]}
        </div>
      ), (
        <div className="swipe-gallery-child" style={{left: '100%'}} key={1}>
          {animationChildren[1]}
        </div>
      )];
    } else if (animationDirection === 'left') {
      return [(
        <div className="swipe-gallery-child" style={{left: '-100%'}} key={0}>
          {animationChildren[0]}
        </div>
      ), (
        <div className="swipe-gallery-child" style={{left: 0}} key={1}>
          {animationChildren[1]}
        </div>
      )];
    }
    return null;
  }
  renderChildrenSlice() {
    const {children, childIndex} = this.props;
    if (!this.getCount()) return null;
    const slice = getChildrenSlice(children, childIndex);
    let tempLeft;
    if (isAtFirstChild(childIndex)) {
      tempLeft = 0;
    } else {
      tempLeft = -1;
    }
    return slice.map((child, index) => {
      const left = (tempLeft * 100) + '%';
      tempLeft++;
      const style = {left};
      const key = index;
      return (
        <div className="swipe-gallery-child" style={style} key={key}>
          {child}
        </div>
      );
    });
  }
  renderChildren() {
    if (this.state.animationChildren) {
      return this.renderAnimationChildren();
    }
    return this.renderChildrenSlice();
  }
  render() {
    const {childIndex} = this.props;
    const animates = this.animationPending();
    return (
      <div className="swipe-gallery" ref={this.handleMountBound}>
        <SwipeHelper
          canSwipeLeft={!animates && childIndex > 0}
          canSwipeRight={!animates && childIndex < (this.getCount() - 1)}
          onSwipingLeft={this.handleSwipingBound}
          onSwipingRight={this.handleSwipingBound}
          onSwipedRight={this.handleSwipedRightBound}
          onSwipedLeft={this.handleSwipedLeftBound}
          onSwipeFailed={this.handleSwipeFailedBound}
        >
          <div
            className={cx('swipe-gallery-animation-wrapper', {animates})}
            ref={this.handleWrapperMountBound}
            style={this.getWrapperStyle()}
          >
            {this.renderChildren()}
          </div>
        </SwipeHelper>
      </div>
    );
  }
}
SwipeGallery.defaultProps = {
  onSwipedRight: () => {},
  onSwipedLeft: () => {},
};
SwipeGallery.propTypes = {
  children: PropTypes.node.isRequired,
  childIndex: PropTypes.number.isRequired,
  onSwipedRight: PropTypes.func,
  onSwipedLeft: PropTypes.func,
};
