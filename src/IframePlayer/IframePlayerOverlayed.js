import React from 'react';
import IframePlayer from './IframePlayer';

export default props => (
  <div className="iframe-player-overlayed">
    <IframePlayer {...props} />
    <div className="overlay" />
  </div>
);
