
import React, {Component} from 'react';
//import ReactDOM from "react-dom";
//import callback from "./chat.html"
import {BrowserRouter, Route, useHistory} from 'react-router-dom';
import { io } from 'socket.io-client'
import { firestore } from '../components/firebase';

const socket = io('http://localhost:3005')

const naverlogin = ()=>{
    return (
        <BrowserRouter>
        <div>
          <Route exact path="/login" component={NaverLogin} />
          <Route path="/login/chat" component={Success} />
        </div>
      </BrowserRouter>
    )
}
var client_id = '8HkITidEmr1tQaw5jtAL'
var redirectURI = encodeURI("http://localhost:3000/login/chat")

class NaverLogin extends Component{

    componentDidMount() {
        var naver_id_login = new window.naver_id_login(client_id, redirectURI)
        var state = naver_id_login.getUniqState()
        naver_id_login.setButton("white", 2,40)
        naver_id_login.setDomain("http://localhost:3000/login/chat")
        naver_id_login.setState(state)
        naver_id_login.init_naver_id_login()
    }
    render(){
        return <div id="naver_id_login"></div>
    }
}
class Success extends Component {
    state = {
      id:'',
      pw: ''
    }
    constructor(props) {
      super(props)
      window.naverSignInCallback = this.naverSignInCallback.bind(this)
    }
    
    naverSignInCallback() {
     var naver_id_login = new window.naver_id_login('8HkITidEmr1tQaw5jtAL', "http://localhost:3000/login/chat")
     
      this.setState({
        id: naver_id_login.getProfileData('email'),
        pw: naver_id_login.getProfileData('id')
      })

      var flag = 0;

      firestore.collection("users")
      .get()
      .then((docs) => {
        docs.forEach((doc)=>{
         if(doc.data().id === this.state.id){
            flag = 1;
          }
        })
        if(flag == 0) {  
          firestore
          .collection("users")
          .add({
            id: this.state.id,
            pw: this.state.pw
          })
        }
        socket.emit('naverlogin',{id: this.state.id, pw: this.state.pw})

      }) 

    }

    componentDidMount() {
      var naver_id_login = new window.naver_id_login('8HkITidEmr1tQaw5jtAL', "http://localhost:3000/login/chat")
      naver_id_login.get_naver_userprofile("naverSignInCallback()")
    }

    render() {
      return (
        <div id="naver_id_login"></div>
      )
    }
}

export default naverlogin;