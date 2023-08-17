import React, { FC, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Manager } from 'socket.io-client'
import './styles.css'

import { firestore } from '../components/firebase';

type FormData = {
  id: string
  pw: string
}

const JoinForm: FC<{
  handleJoin: (id: string, pw: string) => void
}> = (props) => {
  const { handleJoin } = props
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = handleSubmit(({ id, pw }) => {
    if (!id || !pw) {
      alert('아이디와 비밀번호를 모두 입력해주세요.')
      return false
    }

    var flag = 0;
    firestore.collection("users")
      .get()
      .then((docs) => {
        docs.forEach((doc)=>{
         if(doc.data().id === id){
            alert('존재하는 id 입니다.')
            flag = 1;
          }
        })
        if(flag === 0) {  handleJoin(id, pw) }
      })
  })

  return (
    <div className="JoinPage">
      <form onSubmit={onSubmit} id="JoinForm">
          <div>
            <h1>JOIN</h1>
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
            <input className="btn" type="submit" value="회원가입" />
            </p>
          </div>

          <button className="btn" id="loginpagebtn" onClick={() => {navigate('/login')}}>
          로그인
          <br></br>
          하러가기
          </button>
        </form>

    </div>
  )
}

const Join: FC = () => {
  const navigate = useNavigate();
  const socket = useRef(new Manager('http://localhost:3005')).current

  const handleJoin = (id: string, pw: string) => {
      firestore
      .collection("users")
      .add({
        id: id,
        list: [],
        pw: pw
      })
      console.log('handlelogin')
      socket.emit(
        'join',
        { id, pw },
        (res: any) => {
          if (res.result) {
            alert(res.data)
          } else {
            alert('fail to join')
            console.info(res)
          }
        }
      );
  }

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected')
    })
    socket.on('disconnect', () => {
      console.log('disconnected')
    })
    socket.on('loginpage', () => {
      console.log('on')
      navigate('/login')
    })

    socket.on('join', (data: FormData, cb?: Function) => {
      alert(`회원가입에 성공했습니다\n${data.id}님 환영합니다.`)
      //화면 전환
      navigate('/login')
    })
  }, [socket, navigate])

  return (
    <div className="Join">
      <JoinForm handleJoin={handleJoin}/>
    </div>
  )
}

export default Join
