import React, { FC, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { io } from 'socket.io-client'
import './styles.css'

type FormData = {
  id: string
  pw: string
}

const ChatForm: FC<{
  handleChat: (id: string, pw: string) => void
}> = (props) => {
  
  const { handleChat } = props
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = handleSubmit(({ id, pw }) => {
    
    console.log(id, pw)
    if (!id || !pw) {
      alert('check validation')
      return false
    }
    handleChat(id,pw);
  })

  return (
    <body> 
      <nav>
        
        <span id="logoutBtn">
          로그아웃
        </span>
      </nav>
      
      <div id="contentCover">
        <div id="roomWrap">
            <div id="roomList">
                <div id="roomHeader">채팅 방 목록</div>
                <div id="roomSelect">
                    <div className="roomEl active" data-id="1">Chat 1</div>
                    <div className="roomEl" data-id="2">Chat 2</div>
                    <div className="roomEl" data-id="3">Chat 3</div>
                    <div className="roomEl" data-id="4">Chat 4</div>
                </div>
            </div>
        </div>
        <div id="chatWrap">
          <div>
            <big>
              Please enter the room
            </big>
          </div>
          <div id="chatLog"></div>

          <form onSubmit={onSubmit} id="chatForm">
            <input type="text" autoComplete="off" id="message" placeholder="메시지를 입력하세요"/>
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

  const handleChat = (id: string, pw: string) => {
    socket.emit(
      'room',
      { id, pw },
      (res: any) => {
        alert('emit')
        if (res.result) {
          alert(res.data)
          // socketId = socket.id
          // roomId = 1
        } else {
          alert('fail to login')
          console.info(res)
        }
      }
    );
  }

  useEffect(() => {
    socket.on('room', (data: FormData, cb?: Function) => {
      console.log('room')
    })
  }, [socket])

  return (
    <div className="NewChat">
     
      <ChatForm handleChat={handleChat}/>
    </div>
  )
}

export default NewChat
