import React, { Component } from 'react';
import { firestore } from './firebase';
import sproutIcon from './icon.png'
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps'; // 패키지 불러오기
import {withRouter} from 'react-router-dom';

class Map extends Component {
  state = {
    center: {lat: 37.551764, lng: 126.941048},
    stores: [],
    place: '',
  }

  /*검색창에 쓴 검색어를 state.place에 저장*/
  handleChange = (e) => {
    this.setState({
      place: document.getElementById('search').value
    })
  }

  /*state.place에 저장된 검색어와 이름이 같은 점포 찾기*/
  handleSubmit = (e) => {
    this.state.stores.forEach((store) => {
      store.animation = 0;
      if(store.name == this.state.place){
        const navermaps = window.naver.maps;
        this.setState(() => ({ center : new navermaps.LatLng(store.latitude, store.longitude)})); // 지도 중심 이동
        store.animation = 1; // 마커 통통 뛴다!
      }
    })

    e.preventDefault();
  }

  /*마커 클릭 시 채팅방으로 이동*/
  goToChat = (e) =>{
    this.props.history.push("/product")
  }

  /* DB에 저장된 stores 정보 받아오기*/
  componentDidMount() {
    firestore.collection("stores").get().then((docs) => {
      docs.forEach((doc) => {
        this.setState({
          stores: this.state.stores.concat({id: doc.data().id, name: doc.data().name, latitude: doc.data().location.latitude, longitude: doc.data().location.longitude, animation: 0, ...doc })
        });
      });
    });
  }

  render() {
    const { stores, center } = this.state;
    
    return ( 
      <view>
        <form onSubmit={this.handleSubmit}>
        <input 
          className="input_search" 
          type="text" 
          id="search"
          placeholder="search..."
        />
        <input type="submit" value="search" onClick={this.handleChange}/>
        </form>
        <RenderAfterNavermapsLoaded
        ncpClientId={'8tdwhciu8m'} // 자신의 네이버 계정에서 발급받은 Client ID
        error={<p>Maps Load Error</p>}
        loading={<p>Maps Loading...</p>}
        >
          <NaverMap
          mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
          style={{
            width: '100%', // 네이버지도 가로 길이
            height: '100vh' // 네이버지도 세로 길이
          }}
          center={center} // 지도 초기 위치
          defaultZoom={17} // 지도 초기 확대 배율
          >
            {stores.map(row => 
              (<Marker
                key={1}
                position={{lat: row.latitude, lng: row.longitude}}
                animation={row.animation}
                icon={{
                  url:  sproutIcon,
                  size:{width:90, height:60},
                  scaledSize:{width:90,height:60},
                  anchor: {x:90, y:75}
                }}
                title={row.name}
                onClick={this.goToChat}
              />)
            )}  
          </NaverMap>
        </RenderAfterNavermapsLoaded> 
      </view>
    );
  }
}

export default withRouter(Map);