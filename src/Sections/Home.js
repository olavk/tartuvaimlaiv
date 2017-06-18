import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push as _pushLocation} from 'react-router-redux';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="home section-page">
        <div className="banner">
          <h2>Tartu Laulupeol</h2>
          <button className="play-button">Uuri lähemalt</button>
        </div>

        <a onClick={() => this.props.pushLocation('/channels')}>Channels</a>
      </div>
    );
  }
}
Home.propTypes = {
  pushLocation: PropTypes.func.isRequired,
};
export default connect(undefined, {pushLocation: _pushLocation})(Home);
