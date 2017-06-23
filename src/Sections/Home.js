import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push as _pushLocation} from 'react-router-redux';
import PlayButton from 'components/PlayButton';
// import LivePlayer from '../LivePlayer/LivePlayerOverlayed';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChannelsClickBound = this.handleChannelsClick.bind(this);
  }
  handleChannelsClick() {
    this.props.pushLocation('/channels');
  }
  render() {
    return (
      <div className="home">
        <div className="landing-page section-page">
          <div className="banner">
            <h2>Tartu Laulupeol</h2>
            <PlayButton onClick={this.handleChannelsClickBound}>
              Vaata lähemalt
            </PlayButton>
          </div>
        </div>
        <div className="sponsors-page section-page">
          <div className="banner-green">
            Meil on palju toetajaid!
            <div style={{height: 600}}>
              asd
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Home.propTypes = {
  pushLocation: PropTypes.func.isRequired,
};
export default connect(undefined, {pushLocation: _pushLocation})(Home);
