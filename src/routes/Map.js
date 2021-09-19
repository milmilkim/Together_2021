import React, { useRef, useEffect } from 'react';

const Map = () => {
  const { kakao } = window;

  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };

  const container = useRef(null);

  useEffect(() => {
    new kakao.maps.Map(container.current, options); //지도 생성 및 객체 리턴
    return () => {};
  }, []);

  return (
    <div
      className="map"
      style={{ width: '500px', height: '300px' }}
      ref={container}
    />
  );
};

export default Map;
