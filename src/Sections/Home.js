import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push as _pushLocation} from 'react-router-redux';
import PlayButton from 'components/PlayButton';
import logo_makerlab from '../images/logo_makerlab.png';
import logo_rcsnail from '../images/logo_rcsnail.png';
import logo_tartu from '../images/logo_tartu.png';
import logo_telia from '../images/logo_telia.png';
import logo_tiigiseltsimaja from '../images/logo_tiigiseltsimaja.png';

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
          <div className="banner-wide banner-green">
            Meil on palju toetajaid!
          </div>
          <div style={{height: 600}}>
            asd
          </div>
          <div className="banner-wide banner-brown">
            Meil on palju toetajaid!
          </div>
          <div className="logos">
            <a target="_blank" rel="noopener noreferrer" href="http://www.tartu.ee/">
              <img src={logo_tartu} alt="Tartu Linn" title="Tartu Linn" />
            </a>
            <a target="_blank" rel="noopener noreferrer" href="http://www.makerlab.ee/">
              <img src={logo_makerlab} alt="SPARK Makerlab" title="SPARK Makerlab" />
            </a>
            <a target="_blank" rel="noopener noreferrer" href="http://tiigiseltsimaja.tartu.ee/">
              <img src={logo_tiigiseltsimaja} alt="Tiigi Seltsimaja" title="Tiigi Seltsimaja" />
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.telia.ee/">
              <img src={logo_telia} alt="Telia" title="Telia" />
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/RCSnail/">
              <img src={logo_rcsnail} alt="RCSnail" title="RCSnail" />
            </a>
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
