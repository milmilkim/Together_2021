import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { List } from 'antd';

const LocalSeraching = ({ saveKeywordAddress }) => {
  const REST_API_KEY = 'b848a4ccc1802d07fa250ac646972888';
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [addressObject, setAddressObject] = useState([]);
  const page = '1';

  // const onSearch = value => {};

  const getKeyword = async () => {
    await Swal.fire({
      title: '키워드로 검색하기',
      input: 'text',
      text: '키워드를 입력하세요',
      inputPlaceholder: 'ex) 가천대학교',
      confirmButtonText: '입력',
      showCancelButton: true,
      cancelButtonText: '취소',
    }).then(result => {
      if (result.isConfirmed) {
        setQuery(result.value);
      }
    });
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
    getKeyword();
  }, []);

  useEffect(() => {
    if (query !== '') {
      getData();
    }
  }, [query]);

  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div>
          <List
            itemLayout="horizontal"
            dataSource={addressObject}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={item.place_name}
                  description={item.address_name}
                  onClick={() => saveKeywordAddress(item)}
                  style={{ cursor: 'pointer' }}
                />
              </List.Item>
            )}
          />
        </div>
      )}
    </>
  );
};

export default LocalSeraching;
