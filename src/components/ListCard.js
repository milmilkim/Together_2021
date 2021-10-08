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

const ListCard = ({ getApi, keyword }) => {
  //종목을 받아옴
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0); //page가 0부터 시작

  const { Meta } = Card;

  const thumbnailSwitch = event => {
    const setThumbnail = {
      //종목별 썸네일 이미지를 설정합니다. 이미지는 나중에 수정.
      //이건
      축구:
        'https://image.ytn.co.kr/general/jpg/2020/0918/202009181020016953_t.jpg',
      조깅:
        'http://kormedi.com/wp-content/uploads/2020/03/antonioguillem-580x387.jpg',
      야구:
        'https://news.hmgjournal.com/images_n/contents/191204_baseball_01.png',
      야구야구:
        'https://news.hmgjournal.com/images_n/contents/191204_baseball_01.png',

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

  const moreData = async () => {
    try {
      setLoading(true);

      await axios.get(`${getApi}?page=${page}`).then(res => {
        setData(data.concat(res.data.content));
        setPage(page + 1);
      });
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  useEffect(() => {
    moreData();
  }, [getApi]);

  useEffect(() => {}, [getApi]);

  return (
    <div style={{ paddingTop: '20px' }}>
      <div className="listCard">
        <InfiniteScroll
          dataLength={data.length}
          next={moreData}
          hasMore={hasMore}
          endMessage="끝!"
        >
          <Row gutter={10}>
            {data.map(list => (
              <Col xs={12} sm={12} md={8}>
                <Link to={`/post/${list.id}`}>
                  <Card
                    hoverable
                    style={{ width: '100%' }}
                    cover={
                      <img
                        className={!list.recruiting && 'card__img--closed'}
                        alt={list.title}
                        src={thumbnailSwitch(list.event)} //조건에 따라서 맞는 썸네일 이미지를 불러오겠습니다.
                      />
                    }
                    actions={[
                      [<UserOutlined />, list.needPeopleNum],
                      [
                        <CalendarOutlined />,
                        moment(list.eventTime).format('YY/MM/DD'), //EventTime에서 연,월,일만
                      ],
                      [
                        <FieldTimeOutlined />,
                        moment(list.eventTime).format('HH:mm'), //시, 분
                      ],
                    ]}
                  >
                    {!list.recruiting && (
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
                      avatar={<Avatar size={60} src={list.userPicture} />} //프로필이미지 구현 예정?
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
                      description={`${list.region1Depth} ${list.region2Depth}`} //지역명
                    />
                    <Meta
                      className="card__name"
                      description={list.placeName} //지역명
                    />
                    {/* <Meta
                      className="card__name"
                      description="해시?" //해시태그
                    /> */}

                    {/* <Meta
                      className="card__summary"
                      description={list.content} //내용(한줄만 css에서 자름)
                    /> */}
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ListCard;
