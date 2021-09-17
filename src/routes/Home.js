import HomeCarousel from 'components/HomeCarousel';
import ListCard from 'components/ListCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Col, Row, Spin } from 'antd';
import { SmileTwoTone } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState('');
  const [item, setItem] = useState([]);

  const setCarousel = [
    {
      id: 1,
      src: 'banner.jpg',
    },
    {
      id: 2,
      src: 'https://resize.hswstatic.com/w_1200/gif/arctic-fox-1.jpg',
    },
  ];

  const getData = async () => {
    try {
      setLoading(true);
      await axios.get('dummy/dummyJson.json').then((res) => {
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
      <HomeCarousel>{setCarousel}</HomeCarousel>

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
          <InfiniteScroll dataLength="10" next={moreData} hasMore={true}>
            <Row gutter={10}>
              {data.map((list) => (
                <ListCard>{list}</ListCard>
              ))}
            </Row>
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};

export default Home;
