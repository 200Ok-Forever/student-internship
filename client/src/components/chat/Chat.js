import { useContext, useEffect } from "react";
import {
  ChatEngine,
  ChatEngineContext,
  getLatestChats,
  getOrCreateChat,
} from "react-chat-engine";
import { UserContext } from "../../store/UserContext";
import "./chat.scss";
import ChatCard from "./ChatCard";
import ChatFeedTop from "./ChatFeedTop";
import RenderChatForm from "./RenderChatForm";
import RenderChatSettingsTop from "./RenderChatSettingsTop";
import RenderMessageBubble from "./RenderMessageBubble";
import RenderNewMessageForm from "./RenderNewMessageForm";

const Chat = (props) => {
  console.log("🚀 ~ props", props.location?.query?.uid);
  const { user } = useContext(UserContext);
  const currChatUser = user.uid.toString();

  return (
    <ChatEngine
      projectID="e7fb7381-46fd-413f-9422-766a54881ff6"
      userName={currChatUser}
      userSecret={currChatUser}
      height="100vh"
      renderNewChatForm={(creds) => (
        <RenderChatForm
          creds={creds}
          chatWith={props.location.query?.uid.toString()}
        />
      )}
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
      renderPhotosSettings={() => {}}
    />
  );
};

export default Chat;
