import HomeCarousel from 'components/HomeCarousel';
import { Link } from 'react-router-dom';
import ListCard from 'components/ListCard';

const Home = () => {
  return (
    <>
      <HomeCarousel />

      <div className="home__icons">
        <Link to="/category/축구">
          <div className="home__icons--icon">
            <img src="football.png" alt="football" />
          </div>
        </Link>
        <Link to="/category/야구">
          <div className="home__icons--icon">
            <img src="baseball.png" alt="baseball" />
          </div>
        </Link>
        <div className="home__icons--icon">
          <img src="badminton.png" alt="badminton" />
        </div>
        <div className="home__icons--icon">
          <img src="basketball.png" alt="basketball" />
        </div>
      </div>

      <h1 style={{ fontWeight: 700, marginBottom: '20px' }}> 찾아보기 😙 </h1>

      <ListCard category="all" email="email" />
    </>
  );
};

export default Home;
