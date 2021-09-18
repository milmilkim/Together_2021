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

const setCarousel = [
  {
    key: 1,
    src: 'banner.jpg',
  },
  {
    key: 2,
    src: 'https://resize.hswstatic.com/w_1200/gif/arctic-fox-1.jpg',
  },
];

const HomeCarousel = () => {
  return (
    <Carousel autoplay>
      {setCarousel.map((list, index) => (
        <div key={index}>
          <h3 style={contentStyle}>
            <img style={imgFit} src={list.src} alt={list.src} />
          </h3>
        </div>
      ))}
    </Carousel>
  );
};

export default HomeCarousel;
