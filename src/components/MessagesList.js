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
            title="채팅방제목"
            description="숭구리당당숭당당"
          />
        </Card>
      </a>
    </>
  );
};

export default MessagesList;
