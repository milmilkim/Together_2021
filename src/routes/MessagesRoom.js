import React, { useState, useEffect } from 'react';
import { gql, useApolloClient, useSubscription } from '@apollo/client';

import { PageHeader } from 'antd';

import MessageInput from 'components/MessageInput';

import moment from 'moment';

export default function MessagesRoom({ chatId, userId, setChatId, chatName }) {
  const [messages, setMessages] = useState([]);
  const [after, setAfter] = useState(null);
  const [more, setMore] = useState(true);

  const client = useApolloClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMessages() {
    setLoading(true);
    const result = await client.query({
      query: gql`
        query GetMessages($id: ID!, $after: ID) {
          chat(id: $id) {
            messages(first: 5, after: $after, desc: true) {
              id
              content
              sender {
                id
                name
              }
              createdAt
            }
          }
        }
      `,
      variables: { id: chatId, after },
    });
    setLoading(false);
    setError(result.error);
    const messages = Array.from(result.data?.chat?.messages ?? []).reverse();
    if (!messages.length) {
      setMore(false);
      return;
    }
    setMessages(prevMessages => [...messages, ...prevMessages]);
    setAfter(messages[0].id);
  }
  useEffect(() => fetchMessages(), []);

  const [userTyping, setUserTyping] = useState(null);
  useEffect(() => {
    if (!userTyping) return;
    const timer = setTimeout(() => setUserTyping(null), 2000);
    return () => clearTimeout(timer);
  }, [userTyping]);

  useSubscription(
    gql`
      subscription ChatEvent($userId: ID!) {
        chatEvent(userId: $userId) {
          type
          chatId
          message {
            id
            content
            sender {
              id
              name
            }
            createdAt
          }
          user {
            name
          }
        }
      }
    `,
    {
      variables: { userId },
      onSubscriptionData: ({ subscriptionData: { data } }) => {
        const event = data.chatEvent;
        if (event.chatId !== chatId) return;
        switch (event.type) {
          case 'MESSAGE_POSTED':
            setMessages(prevMessages => [...prevMessages, event.message]);
            break;
          case 'USER_TYPING':
            setUserTyping(event.user?.name);
            break;
        }
      },
    },
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="messages__modal">
      <PageHeader
        className="site-page-header"
        onBack={() => setChatId(0)} //창이 닫힙니다.
        title={chatName}
        subTitle="@aa"
      />

      <div className="messages__modal--container">
        <div className="messages__modal--input">
          <MessageInput chatId={chatId} />
        </div>
        <div className="messages__modal--messages">
          <div>
            {more && (
              <a
                onClick={() => fetchMessages()}
                className="underline text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                Load more
              </a>
            )}

            {messages.map(message => {
              console.log(message);
              if (message.sender.id == userId) {
                return (
                  <div className="message-row message-row--own">
                    <div className="message-row__content">
                      <div className="message__info">
                        <span className="message__bubble">
                          {' '}
                          {message.content}
                        </span>
                        <span className="message__time">
                          {moment(message.createdAt).format('YYYY-MM-DD HH:mm')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="message-row">
                    <img
                      src="https://images.unsplash.com/photo-1546842931-886c185b4c8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1970&q=80"
                      alt="임시"
                    />

                    <div className="message-row__content">
                      <span className="message__author">
                        {message.sender?.name}
                      </span>
                      <div className="message__info">
                        <span className="message__bubble">
                          {message.content}
                        </span>
                        <span className="message__time">
                          {moment(message.createdAt).format('YYYY-MM-DD HH:mm')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
            {userTyping && (
              <div className="userTyping">{userTyping} is typing...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
