import React, { Component } from 'react';
import { firestore } from './firebase';
import sproutIcon from './icon.png'
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps'; // 패키지 불러오기
//import { scryRenderedComponentsWithType } from 'react-dom/test-utils';
//import { scryRenderedDOMComponentsWithTag } from 'react-dom/test-utils';

class DrawMarker extends Component {
  render(){ 
    //const { row } = this.props;
    return(
      <Marker
        key={1}
        position={{lat: this.props.row.latitude, lng: this.props.row.longitude}}
        animation={1}
        icon={{
          url:  sproutIcon,
          size:{width:90, height:60},
          scaledSize:{width:90,height:60},
          anchor: {x:90, y:75}
        }}
        onClick={() => {alert(`${this.props.row.name}`);}}
      />
    )
  } 
}

class Map extends Component {
  state = {
    stores: [{}]
  }

  updateList = () => { // 나중에 거리별 필터링도 여기서 수행 가능할듯!
    //const { stores } = this.state;
    //var rows = [];
    firestore.collection("stores").get().then((docs) => {
      docs.forEach((doc) => {
        this.setState({
          stores: this.state.stores.concat({name: doc.data().name, latitude: doc.data().location.latitude, longitude: doc.data().location.longitude, ...doc })
        });
      });
    });
  }

  render() {
    const { stores } = this.state;
    const list = stores.map(function(row){ 
      return row.name; 
    });
    
    return ( 
      <view>
        <a onClick = {this.updateList}> 
          Search 
          {list}
        </a>
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
          defaultCenter={{lat: 37.551764, lng: 126.941048}} // 지도 초기 위치
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
