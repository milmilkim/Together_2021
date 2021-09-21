import HomeCarousel from 'components/HomeCarousel';

import { Row, Spin } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ListCard from 'components/ListCard';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState('');
  const [item, setItem] = useState([]);
  const [hasMore, setHasMore] = useState(true);

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

      <ListCard />
   
    </>
  );
};

export default Home;
