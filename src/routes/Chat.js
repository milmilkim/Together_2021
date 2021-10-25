import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationList,
  Conversation,
  ConversationHeader,
  Avatar,
  Sidebar,
} from '@chatscope/chat-ui-kit-react';

const Chat = () => {
  return (
    <div style={{ position: 'relative', height: '500px' }}>
      <MainContainer responsive>
        <div
          style={{
            height: '340px',
          }}
        >
          <Sidebar position="left" scrollable={false}>
            <ConversationList>
              <Conversation
                name="Lilly"
                lastSenderName="Lilly"
                info="Yes i can do it for you"
                unreadCnt={3}
              >
                <Avatar
                  src="https://ww.namu.la/s/50ec79e07868dd8be7c62f3ca97267517b4f7b8d43b05470c645b336541fdd3593e3a3469a82a8c904f050382ff3c8551606ac7de623941d726582f74a03670a7f0972e3a8439ec9911ee60a1a5c76e1856d5e55e53a42f365f1c95a145ef612"
                  name="Lilly"
                />
              </Conversation>
            </ConversationList>
          </Sidebar>
        </div>
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar
              src="https://ww.namu.la/s/50ec79e07868dd8be7c62f3ca97267517b4f7b8d43b05470c645b336541fdd3593e3a3469a82a8c904f050382ff3c8551606ac7de623941d726582f74a03670a7f0972e3a8439ec9911ee60a1a5c76e1856d5e55e53a42f365f1c95a145ef612"
              name="샤인머스캣"
            />
            <ConversationHeader.Content
              userName="샤인머스캣"
              info="Active 10 mins ago"
            />
            <ConversationHeader.Actions />
          </ConversationHeader>
          <MessageList>
            <Message
              model={{
                message: '.....?',
                sentTime: 'just now',
                sender: '익명의고양이',
              }}
            />
            <Message
              model={{
                message: '...그렇게 됐다...',
                sentTime: 'just now',
                sender: 'localSender',
              }}
            />
          </MessageList>
          <MessageInput placeholder="Type message here" />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default Chat;
