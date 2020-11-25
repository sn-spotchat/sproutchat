import React, { FC, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { io } from 'socket.io-client'
import './styles.css'

type FormData = {
  id: string
  pw: string
}

const JoinForm: FC<{
  handleJoin: (id: string, pw: string) => void
}> = (props) => {
  const { handleJoin } = props
  const history = useHistory();
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = handleSubmit(({ id, pw }) => {
    if (!id || !pw) {
      alert('check validation')
      return false
    }
    handleJoin(id, pw)
  })

  return (
    <div className="JoinPage">
      <form onSubmit={onSubmit} id="JoinForm">
          <div>

            <h1>NEW JOIN</h1>
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

          <button className="btn" id="loginpagebtn" onClick={() => {history.push('/login')}}>
          로그인
          <br></br>
          하러가기
          </button> 
        </form>

       
    </div>
  )
}

const Join: FC = (props) => {
  const history = useHistory();
  const socket = useRef(io('http://localhost:3005')).current

  const handleJoin = (id: string, pw: string) => {
    socket.emit(
      'join',
      { id, pw },
      (res: any) => {
        alert('emit')
        if (res.result) {
          alert(res.data)
          // socketId = socket.id
          // roomId = 1
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
    socket.on('loginpage', (data: any) => {
      console.log('on')
      history.push('/login')
    })

    socket.on('join', (data: FormData, cb?: Function) => {
        alert(`회원가입에 성공했습니다\n${data.id}님 환영합니다.`)
        //화면 전환 
        //JoinSuccess();
        history.push('/login')
    })
  }, [socket])

  return (
    <div className="Join">
      <JoinForm handleJoin={handleJoin}/>
    </div>
  )
}

export default Join
