import HomeCarousel from 'components/HomeCarousel';
import ListCard from 'components/ListCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Row, Col } from 'antd';

import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState('');
  const [item, setItem] = useState([]);

  const getData = async () => {
    try {
      setLoading(true);
      await axios.get('dummy/dummyData.json').then((res) => {
        const sortedRes = res.data.sort((a, b) => b.id - a.id);
        console.log(sortedRes);
        setData(sortedRes.slice(0, 9));
        setItem(sortedRes.slice(9));
        console.log(data);
        console.log(item);
      });
    } catch (e) {
      console.log('-_-+');
    }

    setLoading(false);
  };

  const moreData = async () => {
    setLoading(true);
    setData(data.concat(item.slice(0, 9)));
    setItem(item.slice(9));
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <HomeCarousel />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <InfiniteScroll dataLength="10" next={moreData} hasMore={true}>
            <Row>
              {data.map((list) => (
                <ListCard
                  key={list.id}
                  id={list.id}
                  title={list.title}
                  description={list.description}
                  thumb={list.thumb}
                  profileImg={list.profileImg}
                ></ListCard>
              ))}{' '}
            </Row>
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};

export default Home;
