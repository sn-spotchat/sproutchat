import React, { FC, useEffect, useRef, useState} from 'react'
import {BrowserRouter as Router, Redirect, Route, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { io } from 'socket.io-client'
import './styles.css'
import {items} from '../layouts/Main/SideBar/SideBar.js'

const MyPage: FC = (props) => {
    const history = useHistory();
    const socket = useRef(io('http://localhost:3005')).current
    
    const handleLogout = () =>{
        if(window.confirm("로그아웃 하시겠습니까?") === true){
            items.map((item)=>{
                if(item.label == "My Page"){
                    item.label = "Login"
                    item.href = "/login"
                }
            })
            history.push('/home');
        }
    }

    useEffect(() => {
        console.log("Mypage")
        socket.on('getUserId', (data: String) => {
            console.log("mypage id: " + data)
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
                    <div className="roomEl" data-id="2">Chat 2</div>
                    <div id="out">나가기</div>
                </div>
                <div className="roomName">
                    <div className="roomEl" data-id="3">Chat 3</div>
                    <div id="out">나가기</div>
                    </div>
                <div className="roomName">
                    <div className="roomEl" data-id="4">Chat 4</div>
                    <div id="out">나가기</div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </body>
    )
}

export default MyPage