import React, { FC, useEffect, useRef, useState} from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { io } from 'socket.io-client'
import './styles.css'
import { firestore } from '../components/firebase';
import Join from '../routes/Board/join';
import {items} from '../layouts/Main/SideBar/SideBar.js'

type FormData = {
  id: string
  pw: string
}

const NAVER_LOGIN_SCRIPT_URL = 'https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js'


function appendScript(src: string) {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = true
  script.src = src

  document.head.appendChild(script)
}

const LoginForm: FC<{
  handleLogin: (id: string, pw: string) => void
}> = (props) => {
  const { handleLogin } = props
  const { register, handleSubmit } = useForm<FormData>()
  const history = useHistory();
  const onSubmit = handleSubmit(({ id, pw }) => {   
    console.log(id, pw)
    if (!id || !pw) {
      alert('check validation')
      return false
    }
    handleLogin(id, pw)
  })

  return (
    <div className="LoginPage">

      <form onSubmit={onSubmit} id="LoginForm">
        <div>
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
        </div>
            
        <button className="btn" id="joinpagebtn" onClick={() => {history.push('/join')}}>
          회원가입
          <br></br>
          하러가기
        </button> 
      </form>
       
    </div>
          
  )
}

const NewLogin: FC = (props) => {
  const history = useHistory();
  const socket = useRef(io('http://localhost:3005')).current
  
  const handleLogin = (id: string, pw: string) => {
    socket.emit(
      'login',
      { id, pw }
    );
  }

  /* 등록된 회원인지 조회, db에 있을 시 로그인 */
  const loginCheck = (data: FormData) => {
    var flag = 0;
    firestore.collection("users")
      .where("id", "==", data.id).get()
      .then((docs) => {
        docs.forEach((doc) => {
          if(doc.data().pw == data.pw){
            flag = 1
            alert(`로그인에 성공했습니다\n${data.id}님 환영합니다.`)
            socket.emit('userInfo', data.id);
            items.map((item) => {
              if(item.label == "Login"){
                item.label = "My Page"
                item.href = "/mypage"
              }
            })
            history.push('/mypage') //화면 전환
          }
        })
        if(flag==0) { alert('아이디 또는 비밀번호를 확인해주세요') }
      })
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
    socket.on('joinpage', (data: any) => {
      console.log('on')
      history.push('/join')
    })
    socket.on('login', (data: FormData, cb?: Function) => {
      loginCheck(data)
    })
  }, [socket])

  return (
    <div className="NewLogin">
      <LoginForm handleLogin={handleLogin}/>
    </div>
  )
}

export default NewLogin
