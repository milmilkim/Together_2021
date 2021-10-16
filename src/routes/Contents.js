import { useRef, useEffect, useState } from 'react';
import LocalSeraching from 'components/LocalSearching';
import DateForm from 'components/DateForm';
import axios from 'axios';
import moment from 'moment';
import MapView from './MapView';

const Contents = ({ history }) => {
  const [message, setMessage] = useState([]);

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
