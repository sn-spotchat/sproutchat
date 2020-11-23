import React from "react";
import io from "socket.io-client";   //모듈 가져오기

const socket = io("http://localhost:3002");  //3001번 포트 사용(서버)

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "123",  // userid"been"
    };
  }
  componentWillMount() {
  //  socket.emit("roomjoin", this.state.userid);  // been이라는 방 만들기
    console.log(this.state.userid);
    socket.emit("server",this.state.userid);  
  }
  onclick = (e) => {
    const str = "hwi";         //버튼을 클릭하면
    socket.emit("alert", str); //서버의 소켓 alert이벤트에 "hwi"를 보낸다 
  };
  render() {
    return (
      <div>
        <button onClick={this.onclick}>알림창 보내기</button>  //버튼 클릭
      </div>
    );
  }
}