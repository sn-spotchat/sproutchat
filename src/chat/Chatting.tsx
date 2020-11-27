import React, { FC, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { io } from 'socket.io-client'
import './styles.css'

import $ from 'jquery';


type FormData = {
  id: string
  pw: string
}

type ChatData = {
  msg: string
}

var socketId = "";
var roomId = 0;

var $chatLog = $('#chatLog');
var $memberSelect = $('#memberSelect');
var $chatWrap = $('#chatWrap');

const ChatForm: FC<{
  handleChat: (msg: string) => void
}> = (props) => {
  
  const { handleChat } = props
  const { register, handleSubmit } = useForm<ChatData>()
  const history = useHistory();
  const onSubmit = handleSubmit(({ msg }) => {
    
    console.log(msg)
    if (!msg) {
      alert('check validation')
      return false
    }

    handleChat(msg);
  })


  const handleLogout = () => {
    // const socket = io("http://localhost:3005/");
    // socket.emit('userInfo', '')
    history.push('/home')
  }


  return (
    <body> 
      <nav>
        <div id="logoutHeader">
        <span id="logoutBtn" onClick={handleLogout}>
          로그아웃
        </span>
        </div>
      </nav>
      
      <div id="contentCover">
        <div id="roomWrap">
          <div id="roomList">
            <div id="roomHeader">채팅 방 목록</div>
            <div id="roomSelect">
              <div className="roomName">
                <div className="roomEl active" data-id="1">Chat 1</div>
                <div id="out">나가기</div>
              </div>
              <div className="roomName">
                <div className="roomEl" data-id="2">Chat 2</div>
                <div id="out">나가기</div>
              </div>
              <div className="roomName">
                <div className="roomEl" data-id="3">Chat 3</div>
                <div id="out">나가기</div>
                </div>
              <div className="roomName">
                <div className="roomEl" data-id="4">Chat 4</div>
                <div id="out">나가기</div>
              </div>
            </div>
          </div>
        </div>
        <div id="chatWrap">  
          <div id="chatHeader">Please enter the room</div>      
          <div id="chatLog">


          </div>
          <form onSubmit={onSubmit} id="chatForm">
            <input ref={ register } type="text" autoComplete="off" name="msg" id="message" placeholder="메시지를 입력하세요"/>
            <input type="submit" value="보내기"/>
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

const NewChat: FC = (props) => {
  const socket = useRef(io('http://localhost:3005')).current

  const handleChat = (msg: string) => {

    console.log('handleChat')
    socket.emit(
      'new message',
      { msg },
      (res: any) => {
        
        console.log('emit')
      }
    );
  }

  useEffect(() => {
    socket.on('room', (data: FormData, cb?: Function) => {
      console.log('room')
    })


    socket.on('userlist', (data: any) => {
      let html = "";
      data.forEach((el: { socketId: string; name: any }) => {
          if (el.socketId === socketId) {
              html += `<div className="memberEl">${el.name} (me)</div>`
          } else {
              html += `<div className="memberEl">${el.name}</div>`
          }
      });
      $memberSelect.html(html);
    });

    
    socket.on('lefted room', (data: string) => {
      $chatLog.append(`<div className="notice"><strong>${data}</strong> lefted the room</div>`)
    });

    socket.on('joined room', (data: string) => {
        $chatLog.append(`<div className="notice"><strong>${data}</strong> joined the room</div>`)
    });

    
    socket.on('new message',  (data: any) => {
      $chatWrap.show();
      console.log(data)

      $chatLog.append(`<div className="myMsg msgEl"><div className="msg">${data.msg}</div></div>`)
      /*
      if (data.socketId === socketId) {
        $chatLog.append(`<div className="myMsg msgEl"><span className="msg">${data.msg}</span></div>`)
      }else {
        $chatLog.append(`<div className="anotherMsg msgEl"><span className="anotherName">${data.name}</span><span className="msg">${data.msg}</span></div>`)
      }
      */
      //$chatLog.scrollTop($chatLog[0].scrollHeight - $chatLog[0].clientHeight);
    });

  }, [socket])

  return (
    <div className="NewChat">
     
      <ChatForm handleChat={handleChat}/>
    </div>
  )
}

export default NewChat
