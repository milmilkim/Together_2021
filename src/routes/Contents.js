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
      {localStorage.getItem('token') ? <>로그인중~!</> : <>로그아웃중~!</>}
      <h1>연습장 </h1>
      {/* <LocalSeraching /> */}
      <MapView history={history} />
      <div className="dummy">
        <br />

        {moment('2021-09-30T18:01:28.198913800').format('YY/DD')}
        {/* moment 라이브러리 테스트 */}
        {/* <DateForm /> */}
        <br />
      </div>
    </div>
  );
};

export default Contents;
