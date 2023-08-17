import React, { FC, useEffect, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Manager} from 'socket.io-client'
import { firestore } from '../components/firebase';
import './styles.css'
import {items} from '../layouts/Main/SideBar/SideBar.jsx'

type storeData = {
    id: number
    name: string
}

const MyPage: FC = () => {
    const navigate = useNavigate();
    const socket = useRef(new Manager('http://localhost:3005')).current

    const [roomList, setRoomList] = useState([]);
    let tempList = []
    let userId = ''

    const handleLogout = () =>{
        if(window.confirm("로그아웃 하시겠습니까?")){
            items.map((item)=> {
                if(item.label === "My Page"){
                    item.label = "Login"
                    item.href = "/login"
                }
            })
            socket.emit('userInfo', '');
            navigate('/home');
        }
    }

    useEffect(() => {
        let $roomSelect = $("#roomSelect");

        socket.on('getUserId', (data: string) => {
            if(data !== '') {
                if(userId === ''){

                    firestore.collection("users")
                    .doc(data).onSnapshot((doc) => {
                    userId = doc.get('id')
                    if(doc.get("list")) {
                        tempList = doc.get('list').map((el: storeData) => {
                            return (<div className="roomName">
                                  <div className="myroomEl active" data-id={el.name}> {el.name}</div>
                              </div>
                            )
                        })
                    setRoomList(tempList)
                    }
                    $("#mypage").html("")
                    $("#mypage").append(`<div>환영합니다\t ${userId}회원님</div>`)
                })
                }
            }
        })

        $roomSelect.on("click", "div", function () {
            navigate('/chat');
        });

    }, [socket])

    return(
        <body>
            <nav>
                <button className="btn" onClick={() => {handleLogout()}}>
                    Logout
                </button>
            </nav>

        <div id="mycontentCover">
            <span id="mypage">

            </span>
            <div id="myroomWrap">
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
