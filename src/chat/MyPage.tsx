import React, { FC, useEffect, useRef, useState} from 'react'
import {BrowserRouter as Router, Redirect, Route, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { io } from 'socket.io-client'
import { firestore } from '../components/firebase';
import './styles.css'
import {items} from '../layouts/Main/SideBar/SideBar.js'


const MyPage: FC = (props) => {
    const history = useHistory();
    const socket = useRef(io('http://localhost:3005')).current

    const [roomList, setRoomList] = useState([]);
    let tempList = []
    let userId = ''

    const handleLogout = () =>{
        if(window.confirm("로그아웃 하시겠습니까?") === true){
            items.map((item)=>{
                if(item.label == "My Page"){
                    item.label = "Login"
                    item.href = "/login"
                }
            })
            
            socket.emit('userInfo', '');
            history.push('/home');
        }
    }

    useEffect(() => {
        socket.on('getUserId', (data: string) => {
            if(userId === ''){
                console.log("Mypage")
                userId = data
                firestore.collection("users")
                .where("id", "==", data).get()
                .then((docs) => {
                  docs.forEach((doc) => {
                    tempList = doc.data().list.map((el: number) => (
                      <div className="roomName">
                          <div className="roomEl active" data-id={el}>Chat {el}</div>
                          <div id="out">나가기</div>
                      </div>
                    ))
                    setRoomList(tempList)
                  })   
                })
            }
        })  
    }, [socket])

    return(
        <body> 
            <nav>
                <button className="btn" onClick={() => {handleLogout()}}>
                    Logout
                </button>
            </nav>
      
        <div id="contentCover">
            <div id="roomWrap">
            <div id="roomList">
                <div id="roomHeader">채팅 방 목록</div>
                <div id="roomSelect">
                    {roomList}
                </div>
            </div>
            </div>
        </div>
        </body>
    )
}

export default MyPage