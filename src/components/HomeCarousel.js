import { Carousel } from 'antd';

const contentStyle = {
  height: '250px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const imgFit = {
  height: '250px',
  width: '100%',
  objectFit: 'cover',
};

const HomeCarousel = ({ children }) => {
  return (
    <Carousel autoplay>
      {children.map((list) => (
        <div>
          <h3 style={contentStyle}>
            <img style={imgFit} src={list.src} alt={list.id} />
          </h3>
        </div>
      ))}
    </Carousel>
  );
};

export default HomeCarousel;
