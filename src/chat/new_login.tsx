import React, { FC, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { io } from 'socket.io-client'
import './styles.css'

type FormData = {
  id: string
  pw: string
}

const NAVER_LOGIN_SCRIPT_URL =
  'https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js'

enum SocketMessage {
  LOGIN_USER = 'login:user'
}

function appendScript(src: string) {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = true
  script.src = src

  document.head.appendChild(script)
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
    console.log(id, pw)
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

const NewLogin: FC = (props) => {
  const socket = useRef(io()).current
  const handleLogin = (id: string, pw: string) => {
    socket.emit(
      SocketMessage.LOGIN_USER,
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
    appendScript(NAVER_LOGIN_SCRIPT_URL)
  }, [])

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected')
    })
    socket.on('discounnect', () => {
      console.log('discounnected')
    })
    socket.on('event', (data: unknown) => {
      console.log(data)
    })
    socket.on(SocketMessage.LOGIN_USER, (data: FormData, cb?: Function) => {
      console.log('hi')
      if (loginCheck(data)) {
        alert(`로그인에 성공했습니다: ${data.id}`)
      } else {
        alert('등록된 회원이 없습니다')
      }
    })
  }, [socket])

  return (
    <div className="NewLogin">
      <LoginForm handleLogin={handleLogin} />
    </div>
  )
}

export default NewLogin
