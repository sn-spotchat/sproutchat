import React, { Component } from 'react';
import { firestore } from './firebase';
import sproutIcon from './icon.png'
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps'; // 패키지 불러오기

class DrawMarker extends Component {
  render(){ 
    return(
      <Marker
        key={1}
        position={{lat: this.props.row.latitude, lng: this.props.row.longitude}}
        animation={this.props.row.animation}
        icon={{
          url:  sproutIcon,
          size:{width:90, height:60},
          scaledSize:{width:90,height:60},
          anchor: {x:90, y:75}
        }}
        title={this.props.row.name}
        onClick={() => {alert(`${this.props.row.name}`);}}
      />
    )
  } 
}

class Map extends Component {
  state = {
    center: {lat: 37.551764, lng: 126.941048},
    stores: [],
    place: '',
  }
  handleChange = (e) => {
    this.setState({
      place: e.target.value
    })
  }
  handleCenterChanged = (center) => {
    this.setState({ center }) 
  }

  handleSubmit = (e) => {
    this.state.stores.forEach((store) => {
      store.animation = 0;
      if(store.name == this.state.place){
        const navermaps = window.naver.maps;
        this.setState(() => ({ center : new navermaps.LatLng(store.latitude, store.longitude)}));
        store.animation = 1;
      }
    })

    e.preventDefault();
  }

  componentDidMount() {
    firestore.collection("stores").get().then((docs) => {
      docs.forEach((doc) => {
        this.setState({
          stores: this.state.stores.concat({name: doc.data().name, latitude: doc.data().location.latitude, longitude: doc.data().location.longitude, animation: 0, ...doc })
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
          value={this.state.place} 
          onChange={this.handleChange} 
          placeholder="search..."
        />
        <input type="submit" value="search"/>
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
              (<DrawMarker key = {row.name} row = {row} />)
            )}  
          </NaverMap>
        </RenderAfterNavermapsLoaded> 
      </view>
    );
  }
}

export default Map;
