import React, { useState, useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import throttle from 'lodash/throttle';
import { Input } from 'antd';

import { SendOutlined } from '@ant-design/icons';

export default function MessageInput({ chatId }) {
  const { TextArea } = Input;

  const [message, setMessage] = useState('');

  const [postMessage] = useMutation(gql`
    mutation PostMessage($chatId: ID!, $message: String!) {
      postMessage(chatId: $chatId, text: $message) {
        id
      }
    }
  `);

  const [userTyping] = useMutation(gql`
    mutation UserTyping($chatId: ID!) {
      userTyping(chatId: $chatId) {
        id
      }
    }
  `);
  const throttledUserTyping = useCallback(
    throttle(
      () =>
        userTyping({
          variables: { chatId },
        }),
      3000,
    ),
    [],
  );

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.altKey) {
        setMessage(message => message + '\r\n');
        return;
      } else if (!message.length) {
        return;
      }
      postMessage({ variables: { chatId, message } });
      setMessage('');
    } else {
      throttledUserTyping();
    }
  };

  return (
    <>
      <div className="messages__modal--input--textArea">
        <TextArea
          placeholder="입력"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          autoSize={{ minRows: 1, maxRows: 6 }} //최소 1줄, 최대 6줄까지 엔터로 늘어납니다.
        />
      </div>

      <div className="messages_modal--input--send">
        <SendOutlined />
      </div>
    </>
  );
}
