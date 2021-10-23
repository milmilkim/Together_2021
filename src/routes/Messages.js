import 'routes/Messages.css';
import MessagesRoom from 'routes/MessagesRoom';
import { useState, useEffect } from 'react';
import { layoutState } from 'state';
import { useRecoilState } from 'recoil';
import { HomeOutlined } from '@ant-design/icons';
import MessagesList from 'components/MessagesList';
import { gql } from '@apollo/client';
const Messages = ({ history }) => {
  const [visible, setVisible] = useState(false);
  const [layoutVisible, setLayoutVisible] = useRecoilState(layoutState);

  setLayoutVisible(false);

  const openMessagesModal = () => {
    if (visible) {
      setVisible(false);
    }
    setVisible(true);
  };

  const closeMessagesModal = () => {
    setVisible(false);
  };

  //채팅창 토글

  const goBack = () => {
    history.push('/');
  }; //홈으로

  useEffect(() => {
    return () => {
      setLayoutVisible(true); //채팅을 나가면 레이아웃이 보임
    };
  }, []);

  return (
    <div className="messages__inbox--container">
      <div className="messages__inbox">
        <div className="messages__header">
          <div className="messages__header--column">
            <span>
              <HomeOutlined style={{ fontSize: '24px' }} onClick={goBack} />
            </span>
          </div>
          <div className="messages__header--column">
            <span>
              <h1>MESSAGES</h1>
            </span>
          </div>
          <div className="messages__header--column" />
        </div>
        <div className="messages__inbox--wrap">
          <MessagesList openMessagesModal={openMessagesModal} />
          <MessagesList openMessagesModal={openMessagesModal} />
          <MessagesList openMessagesModal={openMessagesModal} />
          <MessagesList openMessagesModal={openMessagesModal} />
          <MessagesList openMessagesModal={openMessagesModal} />
          <MessagesList openMessagesModal={openMessagesModal} />
          <MessagesList openMessagesModal={openMessagesModal} />
          <MessagesList openMessagesModal={openMessagesModal} />
          <MessagesList openMessagesModal={openMessagesModal} />
          {/* 여기는 나중에 리스트로 바꿔야 합니다 */}
        </div>
      </div>
      <div>
        <MessagesRoom
          visible={visible}
          closeMessagesModal={closeMessagesModal}
        />
      </div>
    </div>
  );
};

export default Messages;
