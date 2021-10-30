import { Avatar } from 'antd';
import { Card } from 'antd';
import { gql, useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { ChatClient } from './ChatClient';
import { stripIgnoredCharacters } from 'graphql';
import { getId } from 'components/Token';

const MessagesList = ({ chatId, setChatId, setChatName }) => {
  const { Meta } = Card;

  const [chats, setChats] = useState([]);

  const handleClick = chat => {
    if (!chatId) {
      setChatId(chat.id);
      setChatName(chat.name);
      // console.log(data);
    } else {
      setChatId(0);
    }
  };

  const client = new ChatClient({
    httpUrl: 'https://chat.habin.io/query',
    wsUrl: 'wss://chat.habin.io/query',
    // httpUrl: 'http://localhost:8080/query',
    // wsUrl: 'ws://localhost:8080/query',
    token: getId(),
  });

  const loadChatList = async () => {
    const chats = await client.getChats();

    setChats(chats);
  };

  useEffect(() => {
    loadChatList();
  }, []);

  return (
    <>
      {chats.map(chat => (
        <div
          key={chat.id}
          onClick={() => handleClick(chat)}
          style={{ cursor: 'pointer' }}
        >
          <Card style={{ width: '100%' }}>
            <Meta
              // avatar={
              //   <Avatar src="https://images.unsplash.com/photo-1546842931-886c185b4c8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1970&q=80" />
              // }
              title={chat.name}
              description={chat.lastMessage}
            />
          </Card>
        </div>
      ))}
    </>
  );

  // return data.chats.map(chat => (
  //   <div key={chat.id} onClick={() => handleClick(chat)}>
  //     <div className="font-bold">{chat.name}</div>
  //     <div>{chat.messages?.[0]?.content}</div>
  //   </div>
  // ));
};

export default MessagesList;
