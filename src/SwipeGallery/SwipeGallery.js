import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import cx from 'classnames';
import SwipeHelper from '../SwipeHelper/SwipeHelper';
import SwipeChild from './SwipeChild';
import leftImage from '../images/left.png';
import rightImage from '../images/right.png';

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
    this.handleClickedLeftBound = this.handleClickedLeft.bind(this);
    this.handleClickedRightBound = this.handleClickedRight.bind(this);
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
    if (this.isAnimationPending()) {
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
  isAnimationPending() {
    return this.state.animationChildren !== null;
  }
  canSwipeLeft() {
    const {childIndex} = this.props;
    const animates = this.isAnimationPending();
    return !animates && childIndex > 0;
  }
  canSwipeRight() {
    const {childIndex} = this.props;
    const animates = this.isAnimationPending();
    return !animates && childIndex < (this.getCount() - 1);
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
  handleSwipedLeft() {
    this.props.onSwipedLeft();
  }
  handleSwipedRight() {
    this.props.onSwipedRight();
  }
  handleSwipeFailed() {
    this.setSwipeFactor(0);
  }
  handleClickedLeft() {
    this.props.onClickedLeft();
  }
  handleClickedRight() {
    this.props.onClickedRight();
  }
  renderAnimationChildren() {
    const {animationChildren, animationDirection} = this.state;
    if (animationDirection === 'right') {
      return [(
        <SwipeChild style={{left: 0}} key={0}>
          {animationChildren[0]}
        </SwipeChild>
      ), (
        <SwipeChild style={{left: '100%'}} key={1}>
          {animationChildren[1]}
        </SwipeChild>
      )];
    } else if (animationDirection === 'left') {
      return [(
        <SwipeChild style={{left: '-100%'}} key={0}>
          {animationChildren[0]}
        </SwipeChild>
      ), (
        <SwipeChild style={{left: 0}} key={1}>
          {animationChildren[1]}
        </SwipeChild>
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
        <SwipeChild style={style} key={key}>
          {child}
        </SwipeChild>
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
    const animates = this.isAnimationPending();
    return (
      <div className="swipe-gallery" ref={this.handleMountBound}>
        <SwipeHelper
          canSwipeLeft={this.canSwipeLeft()}
          canSwipeRight={this.canSwipeLeft()}
          onSwipingLeft={this.handleSwipingBound}
          onSwipingRight={this.handleSwipingBound}
          onSwipedLeft={this.handleSwipedLeftBound}
          onSwipedRight={this.handleSwipedRightBound}
          onSwipeFailed={this.handleSwipeFailedBound}
        >
          <div
            className={cx('swipe-gallery-animation-wrapper', {animates})}
            ref={this.handleWrapperMountBound}
            style={this.getWrapperStyle()}
          >
            {this.renderChildren()}
          </div>
          <div className="swipe-gallery-buttons">
            <button className="swipe-button swipe-button-left" onClick={this.handleClickedLeftBound}>
              <img src={leftImage} alt="left button" />
            </button>
            <button className="swipe-button swipe-button-right" onClick={this.handleClickedRightBound}>
              <img src={rightImage} alt="right button" />
            </button>
          </div>
        </SwipeHelper>
      </div>
    );
  }
}
SwipeGallery.defaultProps = {
  onSwipedRight: () => {},
  onSwipedLeft: () => {},
  onClickedLeft: () => {},
  onClickedRight: () => {},
};
SwipeGallery.propTypes = {
  children: PropTypes.node.isRequired,
  childIndex: PropTypes.number.isRequired,
  onSwipedLeft: PropTypes.func,
  onSwipedRight: PropTypes.func,
  onClickedLeft: PropTypes.func,
  onClickedRight: PropTypes.func,
};
