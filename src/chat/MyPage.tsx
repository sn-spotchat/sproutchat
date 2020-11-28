import React, { FC, useEffect, useRef, useState} from 'react'
import {BrowserRouter as Router, Redirect, Route, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { io } from 'socket.io-client'
import { firestore } from '../components/firebase';
import './styles.css'
import {items} from '../layouts/Main/SideBar/SideBar.js'


type storeData = {
    id: number
    name: string
}

var roomId = '';

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
            userId = ''
            socket.emit('userInfo', '');
            history.push('/home');
        }
    }

    useEffect(() => {
        var $chatLog = $('#chatLog');
        let $roomSelect = $("#roomSelect");
        console.log("Mypage")
        socket.on('getUserId', (data: string) => {
            if(userId === ''){
                console.log("My page: " + data)
                userId = data
                firestore.collection("users")
                .where("id", "==", data).get()
                .then((docs) => {
                    docs.forEach((doc) => {
                        tempList = doc.data().list.map((el: storeData) => (
                            <div className="roomName">
                                <div className="roomEl active" data-id={el.name}> {el.name}</div>
                                <div id="out">나가기</div>
                            </div>
                        ))
                        setRoomList(tempList)
                    })   
                })
            }
        })  


        $roomSelect.on("click", "div", function () {
            history.push('/chat');
            if(!$(this).data('id')) {
            //console.log(roomId)
            } else {
            roomId = $(this).data('id')
            socket.emit('joined room', userId);
            socket.emit('join room', {roomId});
            }
            /*
            $(this).parents().children().removeClass("active");
            $(this).addClass("active");
            */
            $chatLog.html("");
            $('#chatHeader').html(`${roomId}`);
    
            //db에서 내용 불러오기
    
        });
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