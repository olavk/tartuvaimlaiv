import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class SwipeChild extends PureComponent {
  render() {
    const {style, children} = this.props;
    return (
      <div className="swipe-gallery-child" style={style}>
        {children}
      </div>
    );
  }
}
SwipeChild.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
};
