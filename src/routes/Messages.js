import 'routes/Messages.css';
import MessagesRoom from 'routes/MessagesRoom';
import { useState, useEffect } from 'react';
import { layoutState } from 'state';
import { useRecoilState } from 'recoil';
import { HomeOutlined } from '@ant-design/icons';
import MessagesList from 'components/MessagesList';
import { gql, useMutation } from '@apollo/client';
import 'components/Message.css';
import { getToken, getId } from 'components/Token';

const Messages = ({ history, match }) => {
  const [visible, setVisible] = useState(false);
  const [layoutVisible, setLayoutVisible] = useRecoilState(layoutState);
  const [chatId, setChatId] = useState(0);
  const [chatName, setChatName] = useState('');

  console.log(match.params.chatId);

  const userId = getId();

  setLayoutVisible(false);

  //채팅창 토글

  const goBack = () => {
    history.push('/');
  }; //홈으로

  useEffect(() => {
    return () => {
      setLayoutVisible(true); //채팅을 나가면 레이아웃이 보임
    };
  }, []);

  useEffect(() => {
    if (!getToken()) {
      history.push('/loginpage');
    }
  }, []);

  useEffect(() => {
    if (match.params.chatId === undefined) {
    } else {
      setChatId(match.params.chatId);
    }
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
          <MessagesList
            chatId={chatId}
            setChatId={setChatId}
            setChatName={setChatName}
          />
        </div>
      </div>
      <div>
        {chatId ? (
          <MessagesRoom
            chatId={chatId}
            userId={userId}
            setChatId={setChatId}
            chatName={chatName}
          />
        ) : (
          <p />
        )}
      </div>
    </div>
  );
};

export default Messages;
