import { useState } from 'react';

import MapView from './MapView';

const Contents = ({ history }) => {
  return (
    <div className="TestComponent">
      <MapView history={history} />
      <div className="dummy">
        <br />
      </div>
    </div>
  );
};

export default Contents;
