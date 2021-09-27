import 'components/Message.css';

const Message = ({ index, user, message }) => {
  let isMessageRowOwn = false;

  if (user.id === 'rabbit') {
    isMessageRowOwn = true;
  }

  return (
    <div>
      {/* <div className="chat__timestamp">2021년 9월 19일</div> */}

      {/* 받은 메세지 */}

      {isMessageRowOwn ? (
        <div className="message-row message-row--own">
          <div className="message-row__content">
            <div className="message__info">
              <span className="message__bubble">{message}</span>
              <span className="message__time">23:17</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="message-row">
          <img
            src="https://ww.namu.la/s/50ec79e07868dd8be7c62f3ca97267517b4f7b8d43b05470c645b336541fdd3593e3a3469a82a8c904f050382ff3c8551606ac7de623941d726582f74a03670a7f0972e3a8439ec9911ee60a1a5c76e1856d5e55e53a42f365f1c95a145ef612"
            alt="임시"
          />

          <div className="message-row__content">
            <span className="message__author">{user.name}</span>
            <div className="message__info">
              <span className="message__bubble">{message}</span>
              <span className="message__time">21:34</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
