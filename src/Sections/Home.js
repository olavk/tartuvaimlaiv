import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push as _pushLocation} from 'react-router-redux';
import PlayButton from 'components/PlayButton';
import logo_makerlab from '../images/logo_makerlab.png';
import logo_rcsnail from '../images/logo_rcsnail.png';
import logo_tartu from '../images/logo_tartu.png';
// import logo_telia from '../images/logo_telia.png';
import logo_tiigiseltsimaja from '../images/logo_tiigiseltsimaja.png';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChannelsClickBound = this.handleChannelsClick.bind(this);
  }
  handleChannelsClick(se) {
    se.preventDefault();
    this.props.pushLocation('/channels');
  }
  render() {
    return (
      <div className="home">
        <div className="landing-page section-page">
          <div className="banner">
            <h2>Otseülekanded Laulu- ja Tantsupeo rongkäigu seest!</h2>
            <PlayButton onClick={this.handleChannelsClickBound}>
              Vaata otseülekandeid
            </PlayButton>
          </div>
        </div>
        <div className="description-page section-page">
          <div className="banner-wide banner-green">Mis hakkab toimuma?</div>
          <div className="description">
            <p>
              Tartu linn koostöös avatud töökojaga <strong>SPARK Makerlab</strong> lisab laulupeole
              vaatenurki:
              siia (ka nutitelefonist vaadatavale) veebilehele ilmub 2. juulil 10 videoakent, milles
              mängivad otseülekanded Tartu koorilauljate, pillimängijate ning võimlejate-tantsijate
              endi vaatenurgast sõna otseses mõttes &mdash; valitud rongkäiguliste külge on
              kinnitatud kaamerad, mis filmivad XII noorte laulu- ja tantsupeo rongkäiku koos heliga
              “seestpoolt”! Otseülekanded kestavad rongkäigu algusest Vabaduse väljakul kuni
              Lauluväljakule jõudmiseni välja.
            </p>
            <p>
              Otseülekannete vaatamiseks vajuta nupule&nbsp;
              <a onClick={this.handleChannelsClickBound} href="#">“Vaata otseülekandeid”</a>.
              Nutitelefonist vaataja jõuab otseülekanneteni paremalt-vasakule pöidlaliigutusega.
            </p>
            <p>
              Rongkäigus Tartu maakonna ees liigub suure mehatroonilise kuju “noore igavese tudengi”
              süles 2 x 3 m LED-ekraan, millel on kõik 10 otseülekannet näha ka rongkäigu
              pealtvaatajatele. Platvorm jääb pärast rongkäiku Lauluväljakule, kus toimub üllatus!
            </p>
            <p>
              Jaga linki:&nbsp;
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}&picture=&title=&caption=&quote=&description=%23tartuvaimlaulupeol`}
                target="_blank"
              >
                  Facebookis
              </a>,&nbsp;
              <a
                href={`https://twitter.com/share?url=${encodeURIComponent(location.href)}&hashtags=tartuvaimlaulupeol`}
                target="_blank"
              >
                Twitteris
              </a>
            </p>
            <p>
              #tartuvaimlaulupeol
            </p>
          </div>
          <div className="banner-wide banner-brown">
            Meie partnerid
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
            {/*
            <a target="_blank" rel="noopener noreferrer" href="https://www.telia.ee/">
              <img src={logo_telia} alt="Telia" title="Telia" />
            </a>
            */}
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
