import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Input, Space } from 'antd';

const LocalSeraching = () => {
  const { Search } = Input;

  const REST_API_KEY = 'b848a4ccc1802d07fa250ac646972888';
  const [fullAddress, setFullAddress] = useState('금호동');
  const [loading, setLoading] = useState(true);
  const [addressObject, setAddressObject] = useState([]);
  const page = '1';

  const onSearch = value => {
    setFullAddress(value);
    console.log(value);
  };

  const getData = async () => {
    setLoading(true);
    await axios({
      method: 'get',
      url: `https://dapi.kakao.com//v2/local/search/keyword.json?page=${page}&size=15&sort=accuracy&query=${fullAddress}`,
      headers: { Authorization: 'KakaoAK ' + REST_API_KEY },
    }).then(res => {
      setAddressObject(res.data.documents);
      console.log(addressObject);
    });
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [fullAddress]);

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
