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

  })

  return (
    <body> 
      <span id="nav-header">
        <big>SPROUT CHAT</big>
      </span>
      <span id="logoutBtn">
        로그아웃
      </span>

      <div>
          <div id="roomList">
              <div id="roomHeader">채팅 방 목록</div>
              <div id="roomSelect">
                  <div data-id="1">Chat 1</div>
                  <div data-id="2">Chat 2</div>
                  <div data-id="3">Chat 3</div>
                  <div data-id="4">Chat 4</div>
              </div>
          </div>
      </div>
      <div>
        <div>Please enter the room</div>
        <form onSubmit={onSubmit}>
          <input type="text" autoComplete="off" id="message" placeholder="메시지를 입력하세요"/>
          <input type="submit" value="보내기"/>
        </form>
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
