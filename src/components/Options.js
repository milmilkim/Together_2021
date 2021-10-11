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
  기타: [
    'https://file.mk.co.kr/meet/neds/2021/06/image_readtop_2021_535745_16226846584668330.jpg',
  ], //적당히 스포츠적이고 무난한 이미지
};

const setCategory = () => {
  //상단 네비게이션에 포홤될 종목임
  return (
    <SubMenu title="종목별로 찾기" key="2">
      <Link to="/category/축구">
        <Menu.Item key="3">축구</Menu.Item>
      </Link>
      <Menu.Item key="4">어쩌고저쩌고</Menu.Item>
    </SubMenu>
  );
};

const selectEvent = () => {
  //글쓰기의 종목
  return (
    <>
      <Select.Option value="축구">축구</Select.Option>
      <Select.Option value="야구">야구</Select.Option>
      <Select.Option value="농구">농구</Select.Option>
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
    key: 2,
    src: 'banner2.jpg',
  },
];

export { baseApiUrl, setThumbnail, setCategory, selectEvent, setCarousel };
