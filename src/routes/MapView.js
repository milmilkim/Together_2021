import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import 'routes/MapView.css';

const MapView = ({ history }) => {
  const [locations, setLocations] = useState([]);
  const [positions, setPositions] = useState([]);
  const [page, setPage] = useState(0);

  const goBack = () => {
    history.goBack();
  }; //뒤로가기 버튼

  const getData = async () => {
    await axios.get(`/api/home?page=${page}`).then(res => {
      const data = res.data.content;
      setLocations(data);

      const tempArray = []; //새 배열을 만듭니다.

      for (var i = 0; i < data.length; i++) {
        tempArray[i] = {
          title: data[i].title,
          latlng: new kakao.maps.LatLng(
            data[i].locationY, //위도
            data[i].locationX, //경도 .....
          ),
          content: data[i].content, //내용
          idx: data[i].id, //아이디
        };
      }

      setPositions(positions.concat(tempArray));
    });
  };

  const { kakao } = window;

  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };

  const container = useRef(null);
  //useRef로 div map에 접근

  const kakaoMap = () => {
    //현재 위치를 중앙으로 해서 지도를 출력합니다.

    console.log(positions);
    const map = new kakao.maps.Map(container.current, options); //지도 생성

    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude, //위도 (y)
          lon = position.coords.longitude; //경도 (x)

        var locPosition = new kakao.maps.LatLng(lat, lon);
        map.setCenter(locPosition);
      });
    } else {
      var locPosition = new kakao.maps.LatLng(33.450701, 126.570667); //현재 위치를 불러올 수 없을 때: 기본값은 카카오 본사입니다
      map.setCenter(locPosition);
    }

    // 마커 이미지의 이미지 주소입니다
    var imageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

    positions.forEach(function(position) {
      var imageSize = new kakao.maps.Size(24, 35);
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: position.latlng, // 마커를 표시할 위치
        title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });

      var content = document.createElement('div');
      content.className = 'customoverlay';
      var link = document.createElement('div');
      link.className = 'link';
      content.appendChild(link);
      var goPost = document.createElement('div');
      goPost.className = 'title';
      goPost.appendChild(document.createTextNode(position.title));
      goPost.onclick = () => history.push(`/post/${position.idx}`);
      link.appendChild(goPost);

      // 마커에 표시할 커스텀 오버레이
      var customOverlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: marker.getPosition(),
      });
    });
  }; //kakaomap

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  useEffect(() => {
    kakaoMap();
  }, [positions]); //positions의 값이 바뀔때마다 재랜더링 합니다

  return (
    <div>
      <div
        className="map"
        style={{ width: '100%', height: '300px', zIndex: '0' }}
        ref={container}
      />

      <div>
        (지역이 다를 땐 축소를 많이 하면 마커가 보입니다.) 우선 현재 위치를
        불러와 중심 좌표로 설정한 후, 목록에서 위도 경도 가져와서 뿌려줌
        <br />
        현재는 최신순으로, 모집중 여부 관계 없이 12개만 보여주는데 거리순으로
        정렬해야 n개 ..이런식으로 해야 하지 않을까..?? 하지만 시간이 없으니
        구현만 해놓는 것으로 =_=
      </div>
    </div>
  );
};

export default MapView;
