import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IframePlayer from 'src/IframePlayer/IframePlayer';
import {connect} from 'react-redux';
import enableChannel from 'modules/backend/actions/enableChannel';
import disableChannel from 'modules/backend/actions/disableChannel';
// import setTitle from 'modules/backend/actions/setTitle';

// channels
// 01 92417_c_442866
// 02 92417_c_442867
// 03 92417_c_444398
// 04 92417_c_444399
// 05 92417_c_444400
// 06 92417_c_444401
// 07 92417_c_444402
// 08 92417_c_444403
// 09 92417_c_444404
// 10 92417_c_444405

const contentIds = [
  '92417_c_442866',
  '92417_c_442867',
  '92417_c_444398',
  '92417_c_444399',
  '92417_c_444400',
  '92417_c_444401',
  '92417_c_444402',
  '92417_c_444403',
  '92417_c_444404',
  '92417_c_444405',
];

class Backend extends Component {
  constructor(props) {
    super(props);
    const disposedPlayers = {};
    contentIds.forEach(contentId => {
      disposedPlayers[contentId] = true;
    });
    this.state = {
      disposedPlayers,
    };
  }
  toggleDisposed(contentId) {
    const disposedPlayers = {...this.state.disposedPlayers};
    disposedPlayers[contentId] = !disposedPlayers[contentId];
    this.setState({
      disposedPlayers,
    });
  }
  render() {
    const {enabledChannels} = this.props;
    const {disposedPlayers} = this.state;
    return (
      <div className="backend-players">
        <table>
          <tbody>
            {contentIds.map(contentId => (
              <tr key={contentId}>
                <td>
                  <div className="player">
                    {disposedPlayers[contentId] ? null : (
                      <IframePlayer
                        contentId={contentId}
                      />
                    )}
                  </div>
                </td>
                <td>
                  <button onClick={() => this.toggleDisposed(contentId)}>X</button>
                </td>
                <td>
                  {enabledChannels[contentId] === true ? (
                    <button onClick={() => disableChannel(contentId)}>DISABLE</button>
                  ) : (
                    <button onClick={() => enableChannel(contentId)}>ENABLE</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
Backend.defaultProps = {
};
Backend.propTypes = {
  enabledChannels: PropTypes.object.isRequired,
};

export default connect(
  state => ({
    enabledChannels: state.channels.enabledChannels,
  }),
  {
    enableChannel,
    disableChannel,
  }
)(Backend);
