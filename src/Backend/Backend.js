import React, {Component} from 'react';
import IframePlayer from 'src/IframePlayer/IframePlayer';
import {connect} from 'react-redux';

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
    this.state = {
    };
  }
  render() {
    return (
      <div className="backend-players">
        <table>
          <tbody>
            {contentIds.map(contentId => (
              [
                <tr key="player">
                  <td>
                    <div className="player">
                      <IframePlayer contentId={contentId} />
                    </div>
                  </td>
                  <td>
                    <button>on/off</button>
                  </td>
                </tr>,
                <tr key="sep"><td colSpan={99}>&nbsp;</td></tr>,
              ]
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
};

export default connect(
  state => ({
    enabledChannels: state.channels.enabledChannels,
  })
)(Backend);
