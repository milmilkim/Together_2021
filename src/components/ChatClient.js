import {
  ApolloClient,
  createHttpLink,
  split,
  InMemoryCache,
  gql,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

export class ChatClient {
  constructor({ httpUrl, wsUrl, token }) {
    const userId = token;
    const httpLink = createHttpLink({
      uri: httpUrl,
    });
    const wsLink = new WebSocketLink({
      uri: wsUrl,
      options: {
        reconnect: true,
        connectionParams: () => {
          return {
            headers: {
              'user-id': userId,
            },
          };
        },
      },
    });
    const splitLink = split(
      ({ query }) => {
        const def = getMainDefinition(query);
        return (
          def.kind === 'OperationDefinition' && def.operation === 'subscription'
        );
      },
      wsLink,
      httpLink,
    );
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
          'user-id': userId,
        },
      };
    });
    this.client = new ApolloClient({
      link: authLink.concat(splitLink),
      cache: new InMemoryCache(),
    });
    this.userId = userId;
  }

  async createChat(userId) {
    const result = await this.client.mutate({
      mutation: gql`
        mutation CreateChat($userId: ID!) {
          createChat(userIds: [$userId]) {
            id
          }
        }
      `,
      variables: {
        userId,
      },
    });
    return result.data?.createChat?.id;
  }

  async deleteChat(chatId) {
    const result = await this.client.mutate({
      mutation: gql`
        mutation DeleteChat($chatId: ID!) {
          deleteChat(id: $chatId) {
            id
          }
        }
      `,
      variables: {
        chatId,
      },
    });
    return result.data?.deleteChat?.id;
  }

  async getChats() {
    const result = await this.client.query({
      query: gql`
        query GetChats {
          chats {
            id
            name
            messages(first: 1, desc: true) {
              content
              createdAt
            }
          }
        }
      `,
    });
    const chats = [];
    result.data.chats.forEach(chat => {
      chats.push({
        id: chat.id,
        name: chat.name,
        lastMessage: chat.messages?.[0]?.content ?? '',
        lastPostedAt: chat.messages?.[0]?.createdAt ?? '',
      });
    });
    return chats;
  }

  async postMessage({ chatId, message }) {
    const result = await this.client.mutate({
      mutation: gql`
        mutation PostMessage($chatId: ID!, $message: String!) {
          postMessage(chatId: $chatId, text: $message) {
            id
          }
        }
      `,
      variables: {
        chatId,
        message,
      },
    });
    return result.data?.postMessage?.id;
  }

  async listMessages({ chatId, limit = 10, after }) {
    const result = await this.client.query({
      query: gql`
        query GetMessages($chatId: ID!, $limit: Int, $after: ID) {
          chat(id: $chatId) {
            messages(first: $limit, after: $after, desc: true) {
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
      variables: {
        chatId,
        limit,
        after,
      },
    });
    let messages = Array.from(result.data?.chat?.messages ?? []).reverse();
    messages = messages.map(message => ({
      id: message.id,
      message: message.content,
      senderId: message.sender?.id,
      sender: message.sender?.name,
      createdAt: message.createdAt,
    }));
    return messages;
  }

  async streamMessages({ onMessagePosted, onUserTyping }) {
    this.client
      .subscribe({
        query: gql`
          subscription OnChatEvent($userId: ID!) {
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
        variables: {
          userId: this.userId,
        },
      })
      .subscribe({
        next({ data }) {
          const event = data.chatEvent;
          switch (event.type) {
            case 'MESSAGE_POSTED':
              const { message } = event;
              onMessagePosted &&
                onMessagePosted({
                  chatId: event.chatId,
                  id: message.id,
                  message: message.content,
                  senderId: message.sender?.id,
                  sender: message.sender?.name,
                  createdAt: message.createdAt,
                });
              break;
            case 'USER_TYPING':
              onUserTyping && onUserTyping(event.user?.name);
              break;
          }
        },
      });
  }
}
