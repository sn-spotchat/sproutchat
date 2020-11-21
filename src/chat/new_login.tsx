import React, { FC, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { io } from 'socket.io-client'
import './styles.css'

//const socket = io('http://localhost:3005');

type FormData = {
  id: string
  pw: string
  
}

const NAVER_LOGIN_SCRIPT_URL =
  'https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js'



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
  user: ( username: string) => void
}> = (props) => {
  const { handleLogin } = props
  const { user } = props
  const { register, handleSubmit } = useForm<FormData>()
  const [userstate, setState] = useState({
    state : ''
  });
  const onSubmit = handleSubmit(({ id, pw }) => {
    
    console.log(id, pw)
    if (!id || !pw) {
      alert('check validation')
      return false
    }

    fetch('http://localhost:3005/api')
    .then(res=>res.json())
    .then((data) => {
      setState({
        state: String(data.username)
      });    
    });
    
    user(String(userstate.state));
    handleLogin(id, pw)
  })
  
  return (
    
    <body>
    
      <form onSubmit={onSubmit}>


            <h1>NEW LOGIN</h1>

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
    </body>
    
  )
}

const NewLogin: FC = (props) => {
  
  const socket = useRef(io('http://localhost:3005')).current
  
  const user = (username: string ) => {
    console.log(username)
  }
  
  const handleLogin = (id: string, pw: string) => {
    
    socket.emit(
      'login',
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
    appendScript(NAVER_LOGIN_SCRIPT_URL)
  }, [])

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected')
    })
    socket.on('disconnect', () => {
      console.log('disconnected')
    })
    socket.on('event', (data: unknown) => {
      console.log(data)
    })
    
    socket.on('login', (data: FormData, cb?: Function) => {
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
     
      <LoginForm handleLogin={handleLogin} user={user}/>
    </div>
  )
}

export default NewLogin
