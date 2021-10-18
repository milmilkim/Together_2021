import { Menu, Select } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

const baseApiUrl = 'https://www.healthtogether.kro.kr'; //서버 주소

const setThumbnail = {
  //이미지는 직접 올리려면 public 폴더에 올리고 'badminton.png' 이런 식으로.
  축구:
    'https://image.ytn.co.kr/general/jpg/2020/0918/202009181020016953_t.jpg',
  조깅:
    'http://kormedi.com/wp-content/uploads/2020/03/antonioguillem-580x387.jpg',
  야구: 'https://news.hmgjournal.com/images_n/contents/191204_baseball_01.png',
  농구:
    'https://img.huffingtonpost.com/asset/604d983f260000d300d852ab.jpg?ops=scalefit_630_noupscale',
  배드민턴:
    'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fr11IC%2FbtqFgIzZB1R%2FB6Me1hsA2h9nnmwRpDpcg1%2Fimg.jpg',
  헬스:
    'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMzBfMjUy/MDAxNTcyMzYyODEyNzgz.eyUr9XaDarTgtkIJq5MpUgsY_Ky-ePyjDZT_EN5aRhEg.dix2JNKv8E5gkew2m-MqiPY4hbuLsWJWqVUjSf7igSsg.PNG.songqsam/%EC%82%AC%EC%A7%841.png?type=w800',
  자전거: 'https://src.hidoc.co.kr/image/lib/2021/9/29/1632899080192_0.jpg',
  등산: 'http://www.k-health.com/news/photo/201804/35590_22818_1341.jpg',
  기타:
    'https://file.mk.co.kr/meet/neds/2021/06/image_readtop_2021_535745_16226846584668330.jpg', //적당히 스포츠적이고 무난한 이미지
};

const setCategory = () => {
  //상단 네비게이션에 포홤될 종목임
  return (
    <>
      <Menu.Item key="5">
        <Link to="/category/축구">축구 </Link>
      </Menu.Item>

      <Menu.Item key="6">
        <Link to="/category/야구">야구 </Link>
      </Menu.Item>

      <Menu.Item key="7">
        <Link to="/category/농구">농구 </Link>
      </Menu.Item>

      <Menu.Item key="8">
        <Link to="/category/배드민턴">배드민턴 </Link>
      </Menu.Item>

      <Menu.Item key="9">
        <Link to="/category/조깅">조깅 </Link>
      </Menu.Item>

      <Menu.Item key="10">
        <Link to="/category/헬스">헬스 </Link>
      </Menu.Item>

      <Menu.Item key="11">
        <Link to="/category/자전거">자전거 </Link>
      </Menu.Item>

      <Menu.Item key="12">
        <Link to="/category/자전거">등산 </Link>
      </Menu.Item>
    </>
  );
};

const selectEvent = () => {
  //글쓰기의 종목
  return (
    <>
      <Select.Option value="축구">축구</Select.Option>
      <Select.Option value="야구">야구</Select.Option>
      <Select.Option value="농구">농구</Select.Option>
      <Select.Option value="농구">배드민턴</Select.Option>
      <Select.Option value="농구">조깅</Select.Option>
      <Select.Option value="농구">헬스</Select.Option>
      <Select.Option value="농구">자전거</Select.Option>
      <Select.Option value="등산">등산</Select.Option>
      <Select.Option value="기타">기타</Select.Option>
    </>
  );
};

const setCarousel = [
  {
    key: 1,
    src: 'banner.jpg',
  },
  {
    key: 3,
    src: 'banner3.jpg',
  },
  {
    key: 4,
    src: 'banner4.jpg',
  },
  {
    key: 2,
    src: 'banner2.jpg',
  },
];

export { baseApiUrl, setThumbnail, setCategory, selectEvent, setCarousel };
