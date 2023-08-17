import React, { FC, useEffect, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {Manager} from 'socket.io-client'
import './styles.css'
import { firestore } from '../components/firebase';
import {items} from '../layouts/Main/SideBar/SideBar.jsx'
import Naverlogin from '../components/naverlogin'

type FormData = {
  id: string
  pw: string
}

var socketId = "";

const LoginForm: FC<{
  handleLogin: (id: string, pw: string) => void
}> = (props) => {
  const { handleLogin } = props
  const { register, handleSubmit } = useForm<FormData>()
  const navigate = useNavigate();

  const onSubmit = handleSubmit(({ id, pw }) => {
    console.log(id, pw)
    if (!id || !pw) {
      alert('아이디와 비밀번호를 모두 입력해주세요.')

      return false
    }
    handleLogin(id, pw)
  })

  return (
    <div className="LoginPage">
      <form onSubmit={onSubmit} id="LoginForm">
        <div>
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
            <br></br>
          </p>
          <Naverlogin/>
        </div>

        <button className="btn" id="joinpagebtn" onClick={() => {navigate('/join')}}>
          회원가입
          <br></br>
          하러가기
        </button>
      </form>

    </div>

  )
}

const NewLogin: FC = () => {
  const navigate = useNavigate();
  const socket = useRef(new Manager('http://localhost:3005')).current

  const handleLogin = (id: string, pw: string) => {
    socket.emit(
      'login',
      { id, pw }, () => {
      socketId = socket.socket(id).id;
    })
  }

  /* 등록된 회원인지 조회, db에 있을 시 로그인 */
  const loginCheck = (data: FormData) => {
    var flag = 0;
    firestore.collection("users")
      .where("id", "==", data.id).get()
      .then((docs) => {
        docs.forEach((doc) => {
          if(doc.data().pw === data.pw){
            flag = 1
            //alert(`로그인에 성공했습니다\n${data.id}님 환영합니다.`)
            socket.emit('userInfo', doc.id);
            items.map((item) => {
              if(item.label === "Login"){
                item.label = "My Page"
                item.href = "/mypage"
              }
            })
            navigate('/mypage') //화면 전환
          }
        })
        if(flag===0) { alert('아이디 또는 비밀번호를 확인해주세요') }
      })
  }

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected')
    })
    socket.on('disconnect', () => {
      console.log('disconnected')
    })
    socket.on('joinpage', () => {
      console.log('on')
      navigate('/join')
    })
    socket.on('login', (data: FormData, cb?: Function) => {
      loginCheck(data)
    })
    socket.on('naverlogin', (data: FormData) => {
      loginCheck(data)
      console.log(data)
    })
  }, [socket])

  return (
    <div className="NewLogin">
      <LoginForm handleLogin={handleLogin}/>
    </div>
  )
}

export default NewLogin
