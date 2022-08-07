import { ChatEngine } from "react-chat-engine";
import "./chat.scss";
import ChatCard from "./ChatCard";
import ChatFeedTop from "./ChatFeedTop";
import RenderChatForm from "./RenderChatForm";
import RenderChatSettingsTop from "./RenderChatSettingsTop";
import RenderMessageBubble from "./RenderMessageBubble";
import RenderNewMessageForm from "./RenderNewMessageForm";

const Chat = () => {
  // TODO: change uername and usersecret
  const student = "test";

  return (
    <ChatEngine
      projectID="e7fb7381-46fd-413f-9422-766a54881ff6"
      userName={student}
      userSecret={student}
      height="100vh"
      renderNewChatForm={(creds) => <RenderChatForm creds={creds} />}
      onNewMessage={() =>
        new Audio(
          "https://chat-engine-assets.s3.amazonaws.com/click.mp3"
        ).play()
      }
      renderChatSettingsTop={(creds, chat) => (
        <RenderChatSettingsTop creds={creds} chat={chat} />
      )}
      // renderChatFeed={(chatAppState) => <ChatFeed {...chatAppState} />}
      renderNewMessageForm={(creds, chatID) => (
        <RenderNewMessageForm creds={creds} chatID={chatID} />
      )}
      renderMessageBubble={(creds, chat, lastMessage, message, nextMessage) => (
        <RenderMessageBubble
          creds={creds}
          chat={chat}
          lastMessage={lastMessage}
          message={message}
          nextMessage={nextMessage}
        />
      )}
      renderChatHeader={(chat) => <ChatFeedTop chat={chat} />}
      renderChatCard={(chat, index) => <ChatCard chat={chat} index={index} />}
    />
  );
};

export default Chat;
