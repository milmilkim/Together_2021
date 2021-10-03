import { Link } from 'react-router-dom';
import 'components/ListCard.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Row, Col, Spin, Avatar } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons';
import moment from 'moment';

const ListCard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState('');
  const [item, setItem] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { Meta } = Card;

<<<<<<< Updated upstream
=======
  const thumbnailSwitch = event => {
    var img;
    const setThumbnail = {
      //종목별 썸네일 이미지를 설정합니다. 이미지는 나중에 수정.
      축구:
        'https://image.ytn.co.kr/general/jpg/2020/0918/202009181020016953_t.jpg',
      조깅:
        'http://kormedi.com/wp-content/uploads/2020/03/antonioguillem-580x387.jpg',
      기타:
        'https://www.costco.co.kr/medias/sys_master/images/h73/h42/9863158399006.jpg',
    };

    //종목에 따라서 썸네일을 리턴합니다..
    const { 조깅, 축구, 기타 } = setThumbnail;

    if (event === '축구') {
      img = 축구;
    } else if (event === '조깅') {
      img = 조깅;
    } else {
      //이외의 것
      img = 기타;
    }

    return img;
  };

>>>>>>> Stashed changes
  const getData = async () => {
    try {
      setLoading(true);
<<<<<<< Updated upstream
      await axios.get('dummy/dummyJson.json').then(res => {
        const sortedRes = res.data.sort((a, b) => b.id - a.id); //정렬
=======
      await axios.get('/dummy/dummyJson.json').then(res => {
        const sortedRes = res.data.sort((a, b) => b.idx - a.idx); //정렬
>>>>>>> Stashed changes
        setData(sortedRes.slice(0, 9)); //9개 자름
        setItem(sortedRes.slice(9)); //나머지 저장
      });
    } catch (e) {
      console.log('-_-+');
    }

    setLoading(false);
  };

  const moreData = () => {
    console.log('more data...');
    setLoading(true);
    setData(data.concat(item.slice(0, 9)));
    setItem(item.slice(9));
    if (item.length < 1) {
      setHasMore(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="card__spin">
          <Spin tip="Loading..." />
        </div>
      ) : (
        <div className="listCard">
          <InfiniteScroll
            dataLength="9"
            next={moreData}
            loader={
              <div className="card__spin">
                <Spin tip="Loading..." />
              </div>
            }
            hasMore={hasMore}
<<<<<<< Updated upstream
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
=======
>>>>>>> Stashed changes
          >
            <Row gutter={10}>
              {data.map(list => (
<<<<<<< Updated upstream
                <Col xs={24} sm={12} md={8}>
                  <Link to="/contents">
=======
                <Col xs={12} sm={12} md={8}>
                  <Link to={`/post/${list.idx}`}>
>>>>>>> Stashed changes
                    <Card
                      hoverable
                      style={{ width: '100%' }}
                      cover={<img alt="example" src={list.thumbnail} />}
                      actions={[
                        [<UserOutlined />, list.NeedPeopleNumber],
                        [
                          <CalendarOutlined />,
                          moment(list.EventTime).format('YYYY-MM-DD'),
                        ],
                        [
                          <FieldTimeOutlined />,
                          moment(list.EventTime).format('hh:mm'),
                        ],
                      ]}
                    >
                      <Meta
                        className="card__category"
                        description={list.event}
                      />
                      <Meta
                        className="card__profile"
                        avatar={<Avatar size={60} src={list.profileImg} />}
                      />
                      <Meta className="card__name" description={list.writer} />

                      <Meta title={list.title} />
                      <Meta
                        className="card__name"
                        description={list.location_name}
                      />
                      <Meta className="card__name" description={list.hashtag} />

                      <Meta
                        className="card__summary"
                        description={list.content}
                      />
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};

export default ListCard;
