import 'routes/Messages.css';
import MessagesRoom from 'routes/MessagesRoom';
import { useState, useEffect } from 'react';
import { layoutState } from 'state';
import { useRecoilState } from 'recoil';
import { HomeOutlined } from '@ant-design/icons';
import MessagesList from 'components/MessagesList';
import { gql, useMutation } from '@apollo/client';
import 'components/Message.css';

const Messages = ({ history }) => {
  const [visible, setVisible] = useState(false);
  const [layoutVisible, setLayoutVisible] = useRecoilState(layoutState);
  const [chatId, setChatId] = useState(0);
  const userId = 1;
  const [chatName, setChatName] = useState('');

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

  const [setAsOnline] = useMutation(gql`
    mutation SetAsOnline {
      setAsOnline {
        status
      }
    }
  `);
  useEffect(() => {
    const interval = setInterval(setAsOnline, 30 * 1000);
    setAsOnline();
    return () => clearInterval(interval);
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
          <MessagesList setChatId={setChatId} setChatName={setChatName} />
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
