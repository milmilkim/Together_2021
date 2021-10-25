// import { Component } from 'react';
import { Launcher } from 'react-chat-window';
import { useState, useEffect } from 'react';

const ChatBot = () => {
  const [newMessageCount, setNewMessageCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [messageList, setMessageList] = useState([]);
  //기본 메세지

  const sayHello = [
    {
      author: 'them',
      type: 'text',
      data: {
        text: '안녕하세요',
      },
    },
    {
      author: 'them',
      type: 'text',
      data: {
        text: '저도반가워요...',
      },
    },
  ];

  const comment = [
    {
      author: 'them',
      type: 'text',
      data: {
        text: '10주만에 졸업프로젝트 하기',
      },
    },
    {
      author: 'them',
      type: 'text',
      data: {
        text: '정말 가슴이 옹졸해진다',
      },
    },
    {
      author: 'them',
      type: 'text',
      data: {
        text: '모두 안녕...안녕히...',
      },
    },
  ];

  const handleClick = () => {
    setIsOpen(!isOpen);
    setNewMessageCount(0);
  };
  const onMessageWasSent = message => {
    const newMessage = [...messageList, message];

    setMessageList(newMessage);

    if (message.data.text.includes('안녕')) {
      onMessage(sayHello, newMessage, 500);
    } else if (message.data.text.includes('후기')) {
      onMessage(comment, newMessage, 500);
    }
  };

  const onMessage = (text, newMessage, sec) => {
    setTimeout(() => sendMessage(text, newMessage), sec);
  };

  const sendMessage = (text, newMessage) => {
    if (text.length > 0) {
      setNewMessageCount(newMessageCount + text.length);
      setMessageList([...newMessage, ...text]);
    }
  };
  //도착

  //내가 보내는 메세지

  // class ChatBot extends Component {
  //   constructor() {
  //     super();
  //     this.state = {
  //       messageList: [
  //         {
  //           author: 'them',
  //           type: 'text',
  //           data: {
  //             text: '안녕하세요',
  //           },
  //         },
  //       ],
  //     };
  //   }

  //   _onMessageWasSent(message) {
  //     this.setState({
  //       messageList: [...this.state.messageList, message],
  //     });
  //   }

  //   _sendMessage(text) {
  //     if (text.length > 0) {
  //       this.setState({
  //         messageList: [
  //           ...this.state.messageList,
  //           {
  //             author: 'them',
  //             type: 'text',
  //             data: { text },
  //           },
  //         ],
  //       });
  //     }
  //   }

  useEffect(() => {
    setTimeout(() => sendMessage(sayHello, messageList), 2000);
  }, []);

  return (
    <div>
      <Launcher
        agentProfile={{
          teamName: '함수형으로 챗봇',
          imageUrl:
            'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
        }}
        onMessageWasSent={onMessageWasSent}
        messageList={messageList}
        showEmoji={false}
        newMessagesCount={newMessageCount}
        isOpen={isOpen}
        handleClick={handleClick}
      />
    </div>
  );
};

export default ChatBot;
