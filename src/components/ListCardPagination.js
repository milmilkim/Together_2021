import { Link } from 'react-router-dom';
import 'components/ListCard.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Row, Col, Spin, Avatar } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Button } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { setThumbnail } from 'components/Options';
import { BsFillGeoAltFill } from 'react-icons/bs';
import { baseApiUrl } from 'components/Options';

const ListCard = ({ category }) => {
  //종목을 받아옴
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState('');
  const [page, setPage] = useState(0); //page가 0부터 시작
  const [totalPage, setTotalPage] = useState(0);

  const { Meta } = Card;

  const thumbnailSwitch = event => {
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

      await axios
        .get(`${baseApiUrl}/api/board/search/${category}?page=${page}`)
        .then(res => {
          setData(res.data.content);
          setTotalPage(res.data.totalPages);
        });
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  useEffect(() => {
    moreData();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [category]);

  useEffect(() => {
    moreData();
  }, [category, page]);

  return (
    <div style={{ paddingTop: '20px' }}>
      <div className="listCard">
        <Row gutter={10}>
          {data.map(list => (
            <Col xs={24} sm={12} md={8}>
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
                    avatar={<Avatar size={60} src={list.userPicture} />} //프로필 이미지
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
      </div>
      {page > 0 && (
        <Button
          onClick={() => {
            setPage(page - 1);
            window.scrollTo(0, 0);
          }}
        >
          이전
        </Button>
      )}
      {page < totalPage - 1 && (
        <Button
          onClick={() => {
            setPage(page + 1);
            window.scrollTo(0, 0);
          }}
        >
          다음
        </Button>
      )}
    </div>
  );
};

export default ListCard;
