import React from 'react';
import LivePlayer from './LivePlayer';

export default props => (
  <div className="liveplayer-overlayed">
    <LivePlayer {...props} />
    <div className="overlay" />
  </div>
);
