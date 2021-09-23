import { Avatar } from 'antd';
import { Card } from 'antd';

const MessagesList = ({ openMessagesModal }) => {
  const { Meta } = Card;

  return (
    <>
      <a onClick={openMessagesModal}>
        <Card style={{ width: '100%' }}>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="Card title"
            description="This is the description"
          />
        </Card>
      </a>
    </>
  );
};

export default MessagesList;
