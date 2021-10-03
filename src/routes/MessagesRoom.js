import { PageHeader } from 'antd';
import { Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';

import 'components/ListCard.scss';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';

import Message from 'components/Message';
import ScrollToTop from 'components/ScrollToTop';

const MessagesRoom = ({ visible, closeMessagesModal }) => {
  const { TextArea } = Input;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState([]);
  const [scroll, setScroll] = useState('');

  const scrollRef = useRef(null);

  const scrollToBottom = () => {
    if (loading === false) {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  };

  const getData = async () => {
    try {
      setLoading(true);
      await axios.get('dummy/fakeChat.json').then(res => {
        const datas = res.data;
        setData(datas.slice(-12));
        setItem(datas.slice(0, datas.length - 9));
      });
    } catch (e) {
      console.log('-_-+');
    }
    setLoading(false);
  };

  const moreData = () => {
    setLoading(true);
    console.log('more data...');
    setData(item.slice(-9).concat(data));
    setItem(item.slice(0, item.length - 9));

    setLoading(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [visible]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {visible ? (
        <div className="messages__modal">
          <PageHeader
            className="site-page-header"
            onBack={() => closeMessagesModal()}
            title="이름"
            subTitle="@aa"
          />

          <div className="messages__modal--container">
            <div className="messages__modal--input">
              <div className="messages__modal--input--textArea">
                <TextArea
                  placeholder="입력"
                  autoSize={{ minRows: 1, maxRows: 6 }}
                />
              </div>

              <div className="messages_modal--input--send">
                <SendOutlined />
              </div>
            </div>
            {/* 텍스트 입력창 */}
            <div className="messages__modal--messages">
              <div ref={scrollRef}>
                {loading ? (
                  <>loading...</>
                ) : (
                  <>
                    <button onClick={moreData}>ㅇㅇ</button>
                    {data.map((list, index) => (
                      <Message
                        key={index}
                        user={list.user}
                        message={list.message}
                      />
                    ))}
                  </>
                )}{' '}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div ref={scrollRef} />
      )}
    </>
  );
};

export default MessagesRoom;
