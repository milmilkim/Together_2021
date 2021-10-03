import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const SearchLocation = () => {
  const [locations, setLocations] = useState([]);
  const [positions, setPositions] = useState([]);

  const getData = async () => {
    await axios.get('dummy/dummyJson.json').then(res => {
      const data = res.data;
      setLocations(data);

      const tempArray = []; //새 배열을 만듭니다.

      for (var i = 0; i < data.length; i++) {
        tempArray[i] = {
          title: res.data[i].title,
          latlng: new kakao.maps.LatLng(
            res.data[i].location_y, //위도
            res.data[i].location_x, //경도 .....
          ),
        };
      }

      setPositions(tempArray);
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

    for (var i = 0; i < positions.length; i++) {
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });

      //마커 모양과 인포 윈도우는 추후에 수정하겠습니다.
    }
  };

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  useEffect(() => {
    kakaoMap();
  }, [positions]); //positions의 값이 바뀔때마다 재랜더링 합니다 (효울적이지는 않은 거 같은데 비동기 통신 잘 모르겠어요..)

  return (
    <div>
      <div
        className="map"
        style={{ width: '100$', height: '300px', zIndex: '0' }}
        ref={container}
      />

      <div>
        (지역이 다를 땐 축소를 많이 하면 마커가 보입니다.) 우선 현재 위치를
        불러와 중심 좌표로 설정한 후,
        <br />
        데이터베이스 전체의 게시물을 읽어와서 그곳의 좌표를 불러와 지도의 마커로
        뿌려줍니다. <br />
        값이 엄청 많으면 문제가 될 거 같지만..
      </div>
    </div>
  );
};

export default SearchLocation;
