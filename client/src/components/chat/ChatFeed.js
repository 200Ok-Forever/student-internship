import React from "react";

const ChatFeed = (props) => {
  console.log(props.activeChat);
  const { chats, activeChat, userName, messages } = props;
  console.log("🚀 ~ messages", messages);
  const currChat = chats && chats[activeChat];

  const getMessages = () => {
    // const keys = Object.keys(messages);
    // const ids = keys.map((key) => messages[key].);
    // const lastMsgKey =
  };
  getMessages();
  return <div>ChatFeed</div>;
};

export default ChatFeed;
