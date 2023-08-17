import React, {Component} from 'react';
import { firestore } from './firebase';
import sproutIcon from './icon.png'
import searchIcon from './search.png'
import {NaverMap, Marker, InfoWindow, NavermapsProvider, Container as MapDiv, useNavermaps} from 'react-naver-maps'; // 패키지 불러오기
import { Manager } from 'socket.io-client';
import './Map.css';
import firebase from 'firebase';
import 'firebase/firestore';
import { MAPS_CLIENT_ID } from '../constants/maps.constants';

class Map extends Component {

  //socket = useRef(Manager('http://localhost:3005')).current
  state = {
    userID: '',
    center : {lat: 37.551046251096544, lng: 126.94103448409076},
    stores: [],
    place: '',
    recomList: []
  }

  /*검색창에 쓴 검색어를 state.place에 저장*/
  handleChange = () => {
    this.setState({
      place: document.getElementById('search').value
    })
  }

  /*state.place에 저장된 검색어와 이름이 같은 점포 찾기*/
  handleSubmit = (e) => {
    var isFound = false; // 검색 성공하면 true, 실패하면 false
    const list = [];

    this.state.stores.forEach((store) => {
      store.animation = 0;
      if(store.name === this.state.place){
        this.setState(() => ({ center : {lat: store.latitude, lng: store.longitude}})); // 지도 중심 이동
        store.animation = 1; // 마커 통통 뛴다!
        isFound = true;
      }
    });

    /*검색 실패하면 검색어가 포함된 가게 추천*/
    if(isFound === false && this.state.place){
      this.state.stores.forEach((store) => {
        if(store.name.indexOf(this.state.place) !== -1){
          if(list.length <= 5){
            list.push('\'' + store.name + '\' '); // 검색어가 포함된 가게 최대 5개 추가
            store.animation = 1; // 마커 통통~
          }
        }
      })
      if(list.length === 0){
        list.push('검색 결과가 없습니다.');
      }
    }

    this.setState({recomList: list});

    e.preventDefault();
  }

  /*마커 클릭 시 채팅방으로 이동*/
  goToChat = (id, name) =>{
    console.log(this.state.userID)
    if(this.state.userID !== ''){
      firestore.collection("users").doc(this.state.userID).onSnapshot((doc) => {
        firestore.collection("users").doc(doc.id).update({
          list: firebase.firestore.FieldValue.arrayUnion({id: id, name: name})
        })
      })
      window.history.pushState(this.state.center, "", "/home");
      this.props.history.push("/chat")
      console.log("chat " + id)//
      //socket.emit('userlist', id);
    }
  }

  getGPS = () => {
    /* geolocation: 사용자 위치 가져오기 */
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({center: {lat: position.coords.latitude, lng: position.coords.longitude}});
      console.log("Latitude is :", this.state.center.lat);
      console.log("Longitude is :", this.state.center.lng);
    });
  }

  componentDidMount() {
    const socket = new Manager("http://localhost:3005/");
    socket.on('getUserId' , (data) => {
      this.setState({userID: data})
    })

    /* 뒤로가기 누르면 이전의 지도 중심 유지 */
    window.onpopstate =  (event) => {
      this.setState({center: {lat: event.state.lat, lng: event.state.lng}});
    }

    /* DB에 저장된 stores 정보 받아오기*/
    firestore.collection("stores").get().then((docs) => {
      docs.forEach((doc) => {
        this.setState({
          stores: this.state.stores.concat({id: doc.data().id, name: doc.data().name, latitude: doc.data().location.latitude, longitude: doc.data().location.longitude, animation: 0,  ...doc })
        });
      });
    });
  }

  SproutMapComponent = () => {
    const navermaps = useNavermaps();
    // const { stores, center } = this.state;
    return null;
  }

  render() {
    const { stores, center, recomList } = this.state;

    return (
      <view>
        <div className="top">
          <div className="search_container">
            <form onSubmit={this.handleSubmit}>
              <input
                className="input"
                type="text"
                id="search"
                placeholder="search..."
              />

              <input
                className="search_btn"
                src={searchIcon}
                height="25"
                width="25"
                type="image"
                alt="search"
                onClick={this.handleChange}
              />
            </form>
          </div>

          <button className="gps" onClick={this.getGPS}>현재 위치정보 사용</button>
        </div>

        <div className="bottom">
          {recomList /*검색어가 포함된 가게 이름 출력*/}
        </div>
        <MapDiv style={{height: '100vh'}}>
          <NavermapsProvider
            ncpClientId={MAPS_CLIENT_ID} // 자신의 네이버 계정에서 발급받은 Client ID
          >
            <NaverMap
              mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
              center={center} // 지도 초기 위치
              defaultZoom={17} // 지도 초기 확대 배율
            >
              {stores.map(row => (
                <Marker
                  key={row.id}
                  position={{lat: row.latitude, lng: row.longitude}}
                  animation={row.animation}
                  icon={{
                    url: sproutIcon,
                    size:{width:60, height:40},
                    scaledSize:{width:60,height:40},
                    anchor: {x:30, y:40}
                  }}
                  title={row.name}
                  onClick={() => this.goToChat(row.id, row.name)}
                >
                  <InfoWindow
                    anchor={{
                      x: 0,
                      y: 0,
                    }}
                    visible={row.animation === 1}
                    onClose={() => {
                      // Close the InfoWindow when clicked anywhere else on the map
                      this.setState({
                        stores: stores.map(store => ({
                          ...store,
                          animation: 0,
                        })),
                      });
                    }}
                    content={row.name}>
                  </InfoWindow>
                </Marker>)
              )}
              {/*<this.SproutMapComponent />*/}
            </NaverMap>
          </NavermapsProvider>
        </MapDiv>
      </view>
    );
  }
}

export default Map;
