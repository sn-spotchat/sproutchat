import React, { FC, useEffect, useRef, useState} from 'react'
import {BrowserRouter as Router, Redirect, Route, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { io } from 'socket.io-client'
import { firestore } from '../components/firebase';
import './styles.css'
import {items} from '../layouts/Main/SideBar/SideBar.js'

type FormData = {
    id: string
    pw: string
    list: []
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

var roomId = '';
var docId = '';

const MyPage: FC = (props) => {
    const history = useHistory();
    const socket = useRef(io('http://localhost:3005')).current


    const [msgList, setmsgList] = useState([]);
    let mList = [];


    const [roomList, setRoomList] = useState([]);
    let tempList = []
    let userId = ''

    const handleLogout = () =>{
        if(window.confirm("로그아웃 하시겠습니까?") === true){
            items.map((item)=>{
                if(item.label == "My Page"){
                    item.label = "Login"
                    item.href = "/login"
                }
            })
            socket.emit('userInfo', '');
            history.push('/home');
        }
    }
    
    /*
    const handleRoomOut = (id: number) => {
        if(window.confirm("채팅방을 나가시겠습니까?") === true){
          firestore.collection("users")
          .doc(docId).onSnapshot((doc) => {
            tempList = doc.get("list").filter((el: storeData) => el.id !== id)
            firestore.collection("users").doc(docId).update({list: tempList})
          }) 
        }
    }*/

    useEffect(() => {
        var $chatLog = $('#chatLog');
        let $roomSelect = $("#roomSelect");
        //console.log("Mypage")
        socket.on('getUserId', (data: string) => {
            
            if(data !== '') {
                //console.log(userId)
                if(userId === ''){
                    firestore.collection("users")
                    .doc(data).onSnapshot((doc) => {
                    userId = doc.get('id')
                    //console.log('mypage: ' + userId)
                    if(doc.get("list")){
                        tempList = doc.get('list').map((el: storeData) => (
                            <div className="roomName">
                                <div className="myroomEl active" data-id={el.name}> {el.name}</div>
                                {/*
                                <div id="out" onClick={() => handleRoomOut(el.id)}>나가기</div>
                                */}
                            </div>
                        ))
                    setRoomList(tempList)
                    }
                }) 
                }                 
            }
        })  

        $roomSelect.on("click", "div", function () {
            history.push('/chat');
            if(!$(this).data('id')) {
            //console.log(roomId)
            } else {
            roomId = $(this).data('id')
            //console.log(userId)
            socket.emit('joined room', userId);
            socket.emit('join room', {roomId});
            }
            /*
            $(this).parents().children().removeClass("active");
            $(this).addClass("active");
            */
            
            $('#chatHeader').html(`${roomId}`);
            $chatLog.html("");

            //db에서 내용 불러오기
            firestore.collection("messages")
            .doc(roomId).onSnapshot((doc) => {
              if(doc.exists){
                mList = doc.get("msgs").map((el: LogData) => (         
                  <div>
                    { userId == el.uid
                      &&
                      <div className="myMsg msgEl">
                        <div className="timestamp"><strong>{el.timestamp}</strong></div>
                        <div className="msg">{el.message}</div>
                      </div>
                    }
                    { userId != el.uid
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
                
              }
            }) 
        });


    }, [socket])

    return(
        <body> 
            <nav>
                <button className="btn" onClick={() => {handleLogout()}}>
                    Logout
                </button>
            </nav>
      
        <div id="mycontentCover">
            <span id="mypage">
            <big>환영합니다 {userId}회원님</big>
            </span>
            <div id="myroomWrap">
            <div id="roomList">
                <div id="roomHeader">채팅 방 목록</div>
                <div id="roomSelect">
                    {roomList}
                </div>
            </div>
            </div>
        </div>
        </body>
    )
}

export default MyPage