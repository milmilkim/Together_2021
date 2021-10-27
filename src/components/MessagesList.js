import { Avatar } from 'antd';
import { Card } from 'antd';
import { gql, useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';

const MessagesList = ({ setChatId, setChatName }) => {
  const { Meta } = Card;

  const { loading, error, data } = useQuery(gql`
    query GetChats {
      chats {
        id
        name
        messages(first: 1, desc: true) {
          content
        }
      }
    }
  `);

  const handleClick = chat => {
    setChatId(chat.id);
    setChatName(chat.name);
    console.log(chat.id);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {data.chats.map(chat => (
        <div
          key={chat.id}
          onClick={() => handleClick(chat)}
          style={{ cursor: 'pointer' }}
        >
          <Card style={{ width: '100%' }}>
            <Meta
              avatar={
                <Avatar src="https://images.unsplash.com/photo-1546842931-886c185b4c8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1970&q=80" />
              }
              title={chat.name}
              description={chat.messages?.[0]?.content}
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
