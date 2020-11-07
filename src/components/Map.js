import React from 'react';
import './Map.css';

import sproutIcon from './icon.png'
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps'; // 패키지 불러오기

function NaverMapAPI() {
  const navermaps = window.naver.maps;

  return (
    <NaverMap
      mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
      style={{
        width: '100%', // 네이버지도 가로 길이
        height: '100vh' // 네이버지도 세로 길이
      }}
      defaultCenter={{lat: 37.551764, lng: 126.941048}} // 지도 초기 위치
      defaultZoom={15} // 지도 초기 확대 배율
    >
    <Marker
      key={1}
      position={new navermaps.LatLng(37.551047, 126.943052)}
      animation={2}
      icon={{
        url:  sproutIcon,
        size:{width:90, height:60},
        scaledSize:{width:90,height:60},
        anchor: {x:90, y:75}
      }}
      onClick={() => {alert('여기는 서강대학교입니다.');}}
    />
   </NaverMap>
  );
}

function Map() {
  return (
    <RenderAfterNavermapsLoaded
      ncpClientId={'8tdwhciu8m'} // 자신의 네이버 계정에서 발급받은 Client ID
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <NaverMapAPI />
    </RenderAfterNavermapsLoaded>
  );
}

export default Map;