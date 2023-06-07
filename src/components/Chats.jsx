import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase-config";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = async () => {
      const docRef = doc(db, "userChats", currentUser.uid);
      const unsubscribe = onSnapshot(docRef, (snapshot) => {
        setChats(snapshot.data());
      });

      return () => {
        unsubscribe();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div className="chats">
      {chats &&
        Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map(([chatId, chat]) => (
            <div
              className="userChat"
              key={chatId}
              onClick={() => handleSelect(chat.userInfo)}
            >
              {chat.userInfo && <img src={chat.userInfo.photoURL} alt="" />}
              <div className="userChatInfo">
                {chat.userInfo && <span>{chat.userInfo.newName}</span>}
                <p>{chat.lastMessage?.text}</p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Chats;
