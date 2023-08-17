import React, { FC, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {Manager} from 'socket.io-client'
import { firestore } from '../components/firebase';
import './styles.css'
import {items} from '../layouts/Main/SideBar/SideBar.jsx'
import firebase from 'firebase';
import 'firebase/firestore';
import $ from 'jquery';

type ChatData = {
  msg: string
}

type LogData = {
  timestamp: string
  message: string
  uid: string
}

type storeData = {
  id: number
  name: string
}

var docId = "";
var roomId = "";
var userId = "";

const ChatForm: FC<{
  handleChat: (msg: string) => void

}> = (props) => {
  const socket = useRef(new Manager('http://localhost:3005')).current
  const { handleChat } = props

  const { register, handleSubmit } = useForm<ChatData>()
  const navigate = useNavigate();
  const onSubmit = handleSubmit(({ msg }) => {

    if (!msg) {
      alert('check validation')
      return false
    }

    handleChat(msg);
  })

  const [msgList, setmsgList] = useState([]);
  let mList = [];

  const [roomList, setRoomList] = useState([]);
  let tempList = [];

  var memSet = new Set<string>();
  let uid = ""

  var limit = 0

  const handleLogout = () => {
    if(window.confirm("로그아웃 하시겠습니까?")){
      items.map((item)=>{
          if(item.label === "My Page"){
              item.label = "Login"
              item.href = "/login"
          }
      })
      userId = ''
      docId = ''
      socket.emit('userInfo', '');
      navigate('/home');
    }
  }

  const handleRoomOut = (id: string) => {
    if(window.confirm("채팅방을 나가시겠습니까?")){

      firestore.collection("users")
      .doc(docId).onSnapshot((doc) => {
        tempList = doc.get("list").filter((el: storeData) => el.name !== id)
        firestore.collection("users").doc(docId).update({list: tempList})
        id="" ///나왔다가 같은 방 다시 들어갈 수 있음.
      })

      navigate("/home")
    }
  }

  useEffect(()=>{
    var $chatLog = $('#chatLog');
    var $roomSelect = $('#roomSelect');
    var $memberSelect = $("#memberSelect")

    var flag = 0;

    socket.on('getUserId', (data: string) => {
      if(data !== ''){
        docId = data
        if(limit < 5){
          limit += 1;
          firestore.collection("users")
          .doc(data).onSnapshot((doc) => {
              userId = doc.get('id')
              tempList = doc.get("list").map((el: storeData) => (
                      <div className="roomName">
                          <div className="roomEl active" data-id={el.name}>{el.name}</div>
                      </div>
              ))
              setRoomList(tempList)
          })
        }
      }
    })

    $roomSelect.on("click", "div", function () {
      flag = 0;
      $memberSelect.html("")
      memSet.clear()
      memSet.add(userId)
      if(!$(this).data('id')) {
        console.log(roomId)
      } else {
        console.log($(this).data('id'));
        roomId = $(this).data('id')
        socket.emit('joined room', userId);
        socket.emit('join room', {roomId});
      }

      $('#chatHeader').html(`${roomId}`);

      //db에서 내용 불러오기
      if(limit < 10){
        firestore.collection("messages")
        .doc(roomId).onSnapshot((doc) => {
          if(doc.exists){
            mList = doc.get("msgs").map((el: LogData) => (
              <div>
                { userId === el.uid
                  &&
                  <div className="myMsg msgEl">
                    <div className="timestamp"><strong>{el.timestamp}</strong></div>
                    <div className="msg">{el.message}</div>
                  </div>
                }
                { userId !== el.uid
                  &&
                  <div>
                  <div className="anotherMsg msgEl">
                    <span className="anotherName">{el.uid}</span>
                    <span className="msg">{el.message}</span>
                    <div className="timestamp"><strong>{el.timestamp}</strong></div>
                  </div>
                  </div>
                }
              </div>
            ))
            setmsgList(mList)
            if($chatLog.length){
              $chatLog.scrollTop($chatLog[0].scrollHeight - $chatLog[0].clientHeight);
            }

          }
          else{
            mList=[]
            setmsgList([])
          }
        })
      }
      socket.emit('userlist', userId);
    });


    socket.on('userlist', () => {


      firestore.collection("messages")
      .doc(roomId).onSnapshot((doc) => {

        if(doc.exists){
          doc.get("msgs").map((el: LogData) => {
            uid = el.uid
            memSet.add(uid)
          })


          const List = Array.from(memSet);
          console.log(List)
          console.log(typeof(List[0]))
          if(flag === 0){
            console.log(roomId + ' ' + userId)
            for(var i = 0; i < List.length; i++){

              if(userId === List[i]){
                $memberSelect.append(`<div class="memberEl">${List[i]}(me)</div>`)
              }else
               if (List[i] === roomId){
                $memberSelect.append(`<div class="memberEl">${List[i]}(점주)</div>`)
              }else {
                $memberSelect.append(`<div class="memberEl">${List[i]}</div>`)
              }
            }
            flag = 1;
          }
        }
      });
    });
  }, [socket])

  return (
    <body>
      <nav>
        <button className="btn" onClick={() => {handleLogout()}}>
          Logout
        </button>
      </nav>

      <div id="contentCover">
        <div id="roomWrap">
          <div id="roomList">
            <div id="roomHeader">채팅 방 목록</div>
            <span id="roomSelect">
              {roomList}
            </span>
          </div>
        </div>
        <div id="chatWrap">
        <div id="chat_out"><div id="chatHeader">Please enter the room</div>
          <div id="out" onClick={() => handleRoomOut(roomId)}> 나가기 </div>
        </div>

          <div id="chatLog">
            {msgList}
          </div>
          <form onSubmit={onSubmit} id="chatForm">
            <input ref={ register } type="text" autoComplete="off" name="msg" id="message" placeholder="메시지를 입력하세요"/>
            <input type="submit" id="send" value="보내기"/>
          </form>
        </div>
        <div id="memberWrap">
            <div id="memberList">

              <div id="memberHeader">참여자</div>
              <div id="memberSelect"></div>

            </div>
        </div>
      </div>
    </body>
  )
}

const NewChat: FC = () => {

  const handleChat = (msg: string) => {
    let m = $("#message");
    var docRef = firestore.collection("messages").doc(roomId);
    docRef.get().then(function(doc) {
      let now = new Date(Date.now())
      let timeStamp = now.getFullYear() + "년 " + (now.getMonth()+1) + "월 " + now.getDate() + "일 " + (now.getHours() >= 10 ? now.getHours() : "0" + now.getHours()) + ":" + (now.getMinutes() >= 10 ? now.getMinutes() : "0" + now.getMinutes())

      if (doc.exists) {
        docRef.update({
          msgs: firebase.firestore.FieldValue.arrayUnion({message: msg, uid: userId, timestamp: timeStamp})
        }).then(function() {

          m.val("");
        })
      } else {
        docRef.set({
          msgs: firebase.firestore.FieldValue.arrayUnion({message: msg, uid: userId, timestamp: timeStamp})
        }).then(function() {
          m.val("");
        })
      }
    });
  }

  return (
    <div className="NewChat">
      <ChatForm handleChat={handleChat}/>
    </div>
  )
}

export default NewChat
