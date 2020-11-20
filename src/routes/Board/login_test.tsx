import React, { FC, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import  io  from 'socket.io-client'
//import socketIOClient from "socket.io-client";

type FormData = {
  id: string
  pw: string
}

enum SocketMessage {
  LOGIN_USER = 'login:user'
}

function loginCheck(data: FormData) {
  // TODO: Impl
  return true
}

const LoginForm: FC<{
  handleLogin: (id: string, pw: string) => void
}> = (props) => {
  const { handleLogin } = props
  const { register, handleSubmit, errors } = useForm<FormData>()
  const onSubmit = handleSubmit(({ id, pw }) => {
    console.log(id, pw) //찍힘
    if (!id || !pw) {
      alert('check validation')
      return false
    }
    handleLogin(id, pw)
  })

  return (
    <form onSubmit={onSubmit}>
      <h1>LOGIN</h1>
      <p>
        <input
          ref={register}
          type="text"
          name="id"
          placeholder="id"
          autoComplete="off"
        />
      </p>
      <p>
        <input
          ref={register}
          type="password"
          name="pw"
          placeholder="password"
          autoComplete="off"
        />
      </p>
      <p>
        <input className="btn" type="submit" value="로그인" />
      </p>
    </form>
  )
}

const LoginTest: FC = (props) => {
   //const socket = useRef(io()).current;
  const socket = io.connect('http://localhost:3002');
  /*const socket = socketIOClient('/',{
    transports:['websocket'],
    path:'/socket',
  });*/

  const handleLogin = (id: string, pw: string) => {
    console.log('handleLogin');//나옴
    socket.emit(
      //SocketMessage.LOGIN_USER,
      'login',
      { id, pw },
      (res: Record<string, unknown>) => {
        if (res.result) {
          alert(res.data)
          // socketId = socket.id
          // roomId = 1
        } else {
          alert('fail to login')
          console.info(res)
        }
      }
    )
  }

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected')
    })
    socket.on('disconnect', () => {
      console.log('discounnected')
    })
    socket.on('event', (data: unknown) => {
      console.log(data)
    })
    socket.on('login', (data: FormData, cb: Function) => {
      console.log('hi client')
      if (loginCheck(data)) {
        alert(`로그인에 성공했습니다: ${data.id}`)
      } else {
        alert('등록된 회원이 없습니다')
      }
    })
  }, [socket])
  return (
    <div className="App">
      <LoginForm handleLogin={handleLogin} />
    </div>
  )
}

export default LoginTest
