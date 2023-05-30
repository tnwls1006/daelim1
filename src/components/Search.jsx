import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from '../firebase-config';    // , auth, storage

import { AuthContext } from "../context/AuthContext";
// import { ref, listAll, getDownloadURL } from "firebase/storage";


const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
//  const [imageUrl, setImageUrl] = useState("");
  
  const { currentUser } = useContext(AuthContext);

//  const imagesRef = ref(storage, `user-M/${auth.currentUser.uid}/`);
//  const imagesRefF = ref(storage, `user-F/${auth.currentUser.uid}/`);

const handleSearch = async () => {
  const q = query(
    collection(db, "users"),
    where("displayName", "==", username)
  );

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUser(doc.data());
    });
  } catch (err) {
    setErr(true);
  }
};

const handleKey = (e) => {
  e.code === "Enter" && handleSearch();
};  // enter key 반응

const handleSelect = async () => {
  //check whether the group(chats in firestore) exists, if not create
  const combinedId =
    currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;
  try {
    const res = await getDoc(doc(db, "chats", combinedId));

    if (!res.exists()) {
      //create a chat in chats collection
      await setDoc(doc(db, "chats", combinedId), { messages: [] });

      //create user chats
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    }
  } catch (err) {}

  setUser(null);
  setUsername("")
};
    // if (user) {
    //   listAll(imagesRef)
    //     .then((res) => {
    //       // // 가져온 이미지 목록을 업로드 시간이 최근인 순서대로 정렬
    //       // res.items.sort((a, b) => b.timeCreated - a.timeCreated);
    //       // 가장 첫번째 이미지의 다운로드 URL을 가져옴
    //       return getDownloadURL(res.items[0]);
    //     })
    //     .then((url) => {
    //       setImageUrl(url);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="검색"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {/* {err && <span>이용자를 찾을 수 없습니다</span>} */}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;