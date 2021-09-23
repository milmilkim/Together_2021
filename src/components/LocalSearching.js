import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Input } from 'antd';

const LocalSeraching = () => {
  const { Search } = Input;

  const REST_API_KEY = 'b848a4ccc1802d07fa250ac646972888';
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [addressObject, setAddressObject] = useState([]);
  const page = '1'; //페이지

  const onSearch = value => {
    setQuery(value);
  };

  const getData = async () => {
    setLoading(true);
    await axios({
      method: 'get',
      url: 'https://dapi.kakao.com//v2/local/search/keyword',
      headers: { Authorization: 'KakaoAK ' + REST_API_KEY },
      params: {
        page: page,
        size: 10,
        query: query,
      },
    }).then(res => {
      setAddressObject(res.data.documents);
    });
    setLoading(false);
  };

  useEffect(() => {
    if (query !== '') getData();
  }, [query]); //값이 변경될 때마다 실행

  return (
    <>
      <Search placeholder="input search text" onSearch={onSearch} enterButton />

      {loading ? (
        <div>loading...</div>
      ) : (
        <div>
          {addressObject.map(item => (
            <li>
              {item.address_name} {item.place_name}
            </li>
          ))}
        </div>
      )}
    </>
  );
};

export default LocalSeraching;
