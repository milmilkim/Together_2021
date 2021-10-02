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
      }); //스크롤바를 맨 밑으로 내리는 함수
    }
  };

  const getData = async () => {
    try {
      setLoading(true);
      await axios.get('dummy/fakeChat.json').then(res => {
        const datas = res.data;
        setData(datas.slice(-9)); //일단 마지막의 9개를 보여주도록 했습니다. 변수로 설정하는 게 나을 듯..
        setItem(datas.slice(0, datas.length - 9)); //나머지를 저장합니다
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
  }, [visible]); //일단 창이 열리면 맨 밑으로 가는 함수가 실행되는데 나중에 대화 내용이 갱신되면 실행되도록 수정해야 합니다.

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {visible ? (
        <div className="messages__modal">
          <PageHeader
            className="site-page-header"
            onBack={() => closeMessagesModal()} //창이 닫힙니다.
            title="이름"
            subTitle="@aa"
          />

          <div className="messages__modal--container">
            <div className="messages__modal--input">
              <div className="messages__modal--input--textArea">
                <TextArea
                  placeholder="입력"
                  autoSize={{ minRows: 1, maxRows: 6 }} //최소 1줄, 최대 6줄까지 엔터로 늘어납니다.
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
                    <button onClick={moreData}>이전 대화 불러오기</button>
                    {/* 예쁜 버튼으로 바꿔주세요 */}
                    {data.map((list, index) => (
                      <Message
                        key={index}
                        user={list.user}
                        message={list.message}
                      />
                    ))}
                  </>
                )}
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
