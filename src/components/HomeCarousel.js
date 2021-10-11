import { Carousel } from 'antd';
import { setCarousel } from 'components/Options';

const contentStyle = {
  color: '#fff',
  width: '100%',
  height: 'auto',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const imgFit = {
  height: '100%',
  width: '100%',
  objectFit: 'cover',
};

const HomeCarousel = () => {
  return (
    <Carousel autoplay>
      {setCarousel.map(list => (
        <div key={list.key}>
          <h3 style={contentStyle}>
            <img style={imgFit} src={list.src} alt={list.src} />
          </h3>
        </div>
      ))}
    </Carousel>
  );
};

export default HomeCarousel;
