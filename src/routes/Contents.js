import { useRef, useEffect, useState } from 'react';
import Map from 'routes/Map';
import LocalSeraching from 'components/LocalSearching';
import DateForm from 'components/DateForm';
import axios from 'axios';
import moment from 'moment';
<<<<<<< Updated upstream
=======
import MapView from './MapView';
>>>>>>> Stashed changes

const Contents = () => {
  const [message, setMessage] = useState('');

  // const getData = async () => {
  //   await axios.get('api/hello').then(response => setMessage(response.data));
  // }; //localhost:8080 서버 연동 테스트

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <div className="TestComponent">
      <h1>연습장 </h1>
<<<<<<< Updated upstream
      <LocalSeraching />
      <Map />
=======
      {/* <LocalSeraching /> */}
      <MapView />
      {/* <Map /> */}
>>>>>>> Stashed changes
      <div className="dummy">
        <br />
        {/* {message} */}
        {moment('2021-09-30T18:01:28.198913800').format('YY/DD')}
        {/* moment 라이브러리 테스트 */}
        <DateForm />
        <br />
      </div>
    </div>
  );
};

export default Contents;
