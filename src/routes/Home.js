import HomeCarousel from 'components/HomeCarousel';
import { Link } from 'react-router-dom';
import ListCard from 'components/ListCard';

const Home = () => {


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
