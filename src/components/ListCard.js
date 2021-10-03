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

const ListCard = ({ category }) => {
  //종목을 받아옴
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState('');
  const [item, setItem] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { Meta } = Card;

  const thumbnailSwitch = event => {
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
    var img;

    if (setThumbnail.hasOwnProperty(event)) {
      img = setThumbnail[event];
    } else {
      img = setThumbnail.기타;
    }

    return img;
  };

  const getData = async () => {
    try {
      setLoading(true);
      await axios.get('/dummy/dummyJson.json').then(res => {
        if (category === undefined) {
          const sortedRes = res.data.sort((a, b) => b.idx - a.idx); //정렬
          setData(sortedRes.slice(0, 9)); //9개 자름
          setItem(sortedRes.slice(9)); //나머지 저장
        } else {
          const filteredRes = res.data.filter(cate => cate.event == category);
          const sortedRes = filteredRes.sort((a, b) => b.idx - a.idx); //정렬
          setData(sortedRes.slice(0, 9)); //9개 자름
          setItem(sortedRes.slice(9)); //나머지 저장
        }
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
    <div style={{ paddingTop: '20px' }}>
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
          >
            <Row gutter={10}>
              {data.map(list => (
                <Col xs={12} sm={12} md={8}>
                  <Link to={`/post/${list.idx}`}>
                    <Card
                      hoverable
                      style={{ width: '100%' }}
                      cover={
                        <img
                          className={!list.IsRecruiting && 'card__img--closed'}
                          alt={list.title}
                          src={thumbnailSwitch(list.event)} //조건에 따라서 맞는 썸네일 이미지를 불러오겠습니다.
                        />
                      }
                      actions={[
                        [<UserOutlined />, list.NeedPeopleNumber],
                        [
                          <CalendarOutlined />,
                          moment(list.EventTime).format('YY/MM/DD'), //EventTime에서 연,월,일만
                        ],
                        [
                          <FieldTimeOutlined />,
                          moment(list.EventTime).format('HH:mm'), //시, 분
                        ],
                      ]}
                    >
                      {!list.IsRecruiting && (
                        <Meta
                          className="card__completed"
                          description="🔒 모 집 완 료" //모집완료시 표시
                        />
                      )}

                      <Meta
                        className="card__category"
                        description={list.event} //종목명
                      />

                      <Meta
                        className="card__profile"
                        avatar={<Avatar size={60} src={list.profileImg} />} //프로필이미지
                      />
                      <Meta
                        className="card__name"
                        description={list.writer} //글쓴이 닉네임
                      />

                      <Meta
                        title={list.title} //제목
                      />
                      <Meta
                        className="card__name"
                        description={list.location_name} //지역명 ex) 서울 성동구
                      />
                      <Meta
                        className="card__name"
                        description={list.hashtag} //해시태그
                      />

                      <Meta
                        className="card__summary"
                        description={list.content} //내용(한줄만 css에서 자름)
                      />
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default ListCard;
