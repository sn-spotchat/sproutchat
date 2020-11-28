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
    let list = []
    let userId = ''

    const handleLogout = () =>{
        if(window.confirm("로그아웃 하시겠습니까?") === true){
            items.map((item)=>{
                if(item.label == "My Page"){
                    item.label = "Login"
                    item.href = "/login"
                }
            })
            userId = ''
            socket.emit('userInfo', '');
            history.push('/home');
        }
    }

    useEffect(() => {
        console.log("Mypage")
        socket.on('getUserId', (data: string) => {
            if(userId === ''){
                console.log("My page: " + data)
                userId = data
                firestore.collection("users")
                .where("id", "==", data).get()
                .then((docs) => {
                    docs.forEach((doc) => {     
                        setRoomList(doc.data().list)
                    })   
                })
            }
        })  
    }, [socket])

    return(
        <body> 
            <button className="btn" onClick={() => {handleLogout()}}>
                    Logout
            </button>
      
        <div id="contentCover">
            <div id="roomWrap">
            <div id="roomList">
                <div id="roomHeader">채팅 방 목록</div>
                <div id="roomSelect">
                    <div className="roomName">
                        <div className="roomEl active" data-id="1">Chat 1</div>
                        <div id="out">나가기</div>
                    </div>
                    <div className="roomName">
                        <div className="roomEl active" data-id={roomList[0]}>Chat {roomList[0]}</div>
                        <div id="out">나가기</div>
                    </div>
                    <div>{roomList}</div>
                    {roomList.forEach((el) => {
                        <div className="roomName">
                            <div className="roomEl active" data-id={el}>Chat {el}</div>
                            <div id="out">나가기</div>
                        </div>
                    })}
                </div>
            </div>
            </div>
        </div>
        </body>
    )
}

export default MyPage