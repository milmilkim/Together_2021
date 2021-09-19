import 'routes/Messages.css';
import MessagesRoom from 'routes/MessagesRoom';
import { useState, useEffect } from 'react';
import { layoutState } from 'state';
import { useRecoilState } from 'recoil';
import { HomeOutlined } from '@ant-design/icons';
import MessagesList from 'components/MessagesList';

const Messages = ({ history }) => {
  const [visible, setVisible] = useState(false);
  const [layoutVisible, setLayoutVisible] = useRecoilState(layoutState);

  setLayoutVisible(false);

  const openMessagesModal = () => {
    setVisible(true);
  };

  const closeMessagesModal = () => {
    setVisible(false);
  };

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    return () => {
      setLayoutVisible(true);
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
              <h1>MESSASGES</h1>
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
