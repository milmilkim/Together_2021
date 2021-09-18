import { Card, Avatar, Col } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const ListCard = ({ children }) => {
  const {
    description,
    thumbnail,
    profileImg,
    title,
    count,
    city,
    hashtag,
    id,
  } = children;
  const { Meta } = Card;

  const thumbCrob = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '10px',
  };

  return (
    <Col xs={24} sm={12} md={8}>
      <Link to="/contents">
        <Card
          bordered={false}
          cover={<img style={thumbCrob} alt={description} src={thumbnail} />}
        >
          <Meta avatar={<Avatar src={profileImg} />} title={title} />
          {city} <TeamOutlined style={{ fontSize: 14 }} />
          {count}
          <br />#{hashtag} <br />
          {id}
        </Card>
      </Link>
    </Col>
  );
};

export default ListCard;
