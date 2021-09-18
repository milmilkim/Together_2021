import { PageHeader } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { Card } from 'antd';

const MessagesRoom = ({ visible, closeMessagesModal }) => {
  const { TextArea } = Input;

  return (
    <div className={'messages__modal ' + visible}>
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
        <div className="messages__modal--messages">
          <div className="chat__timestamp">2021년 9월 19일</div>

          <div className="message-row">
            <img src="https://ww.namu.la/s/50ec79e07868dd8be7c62f3ca97267517b4f7b8d43b05470c645b336541fdd3593e3a3469a82a8c904f050382ff3c8551606ac7de623941d726582f74a03670a7f0972e3a8439ec9911ee60a1a5c76e1856d5e55e53a42f365f1c95a145ef612" />
            <div className="message-row__content">
              <span className="message__author">이름</span>
              <div className="message__info">
                <span className="message__bubble">
                  Give me that, hook that, spin that roulette
                </span>
                <span className="message__time">21:34</span>
              </div>
            </div>
          </div>

          <div className="message-row message-row--own">
            <div className="message-row__content">
              <div className="message__info">
                <span className="message__bubble">
                  Vodka in my cup 빙빙 도는 Spin it, tip it, strip it, shawty
                </span>
                <span className="message__time">23:17</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesRoom;
