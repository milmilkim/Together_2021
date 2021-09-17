import { Card, Avatar, Row, Col } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const ListCard = ({ id, title, thumb, description, profileImg }) => {
  const { Meta } = Card;

  const thumbCrob = {
    width: '300px',
    height: '300px',
    objectFit: 'cover',
  };

  return (
    <Col span={8}>
      <Card
        style={{ width: 300 }}
        cover={<img style={thumbCrob} alt={description} src={thumb} />}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={<Avatar src={profileImg} />}
          title={title}
          description={description}
        />
        id:{id}
      </Card>
    </Col>
  );
};

export default ListCard;
