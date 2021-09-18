import HomeCarousel from 'components/HomeCarousel';
import ListCard from 'components/ListCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Row, Spin } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState('');
  const [item, setItem] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      await axios.get('dummy/dummyJson.json').then((res) => {
        const sortedRes = res.data.sort((a, b) => b.id - a.id);
        setData(sortedRes.slice(0, 9));
        setItem(sortedRes.slice(9));
      });
    } catch (e) {
      console.log('-_-+');
    }

    setLoading(false);
  };

  const moreData = () => {
    setLoading(true);
    setData(data.concat(item.slice(0, 9)));
    setItem(item.slice(9));
    if (item < 1) {
      setHasMore(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <HomeCarousel />

      <div className="home__icons">
        <Link to="/#">
          <div className="home__icons--icon">
            <img src="football.png" alt="football" />
          </div>
        </Link>
        <div className="home__icons--icon">
          <img src="badminton.png" alt="badminton" />
        </div>
        <div className="home__icons--icon">
          <img src="basketball.png" alt="basketball" />
        </div>
      </div>

      <h1 style={{ fontWeight: 700 }}> 찾아보기 😙 </h1>

      {loading ? (
        <div className="card__spin">
          <Spin tip="Loading..." />
        </div>
      ) : (
        <div>
          <InfiniteScroll
            dataLength="10"
            next={moreData}
            loader={
              <div className="card__spin">
                <Spin tip="Loading..." />
              </div>
            }
            hasMore={hasMore}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <Row gutter={10}>
              {data.map((list, index) => (
                <ListCard key={index}>{list}</ListCard>
              ))}
            </Row>
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};

export default Home;
