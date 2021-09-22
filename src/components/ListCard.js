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

const ListCard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState('');
  const [item, setItem] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { Meta } = Card;

  const getData = async () => {
    try {
      setLoading(true);
      await axios.get('dummy/dummyJson.json').then(res => { 
        const sortedRes = res.data.sort((a, b) => b.id - a.id); //정렬
        setData(sortedRes.slice(0, 9)); //9개 자름
        setItem(sortedRes.slice(9)); //나머지 저장
      });
    } catch (e) {
      console.log('-_-+');
    }

    setLoading(false);
  };

  const moreData = () => {
    setLoading(true);
    setData(data.concat(item.slice(0, 9)));
    setItem(item.slice(9));
    if (item < 1) {
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
            dataLength="10"
            next={moreData}
            loader={
              <div className="card__spin">
                <Spin tip="Loading..." />
              </div>
            }
            hasMore={hasMore}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <Row gutter={10}>
              {data.map(list => (
                <Col xs={24} sm={12} md={8}>
                  <Link to="/contents">
                    <Card
                      hoverable
                      style={{ width: '100%' }}
                      cover={<img alt="example" src={list.thumbnail} />}
                      actions={[
                        [<UserOutlined />, list.count],
                        [<CalendarOutlined />, list.date],
                        [<FieldTimeOutlined />, list.time],
                      ]}
                    >
                      <Meta
                        className="card__category"
                        description={list.category}
                      />
                      <Meta
                        className="card__profile"
                        avatar={<Avatar size={60} src={list.profileImg} />}
                      />
                      <Meta className="card__name" description={list.name} />

                      <Meta title={list.title} />
                      <Meta className="card__name" description={list.city} />
                      <Meta className="card__name" description={list.hashtag} />

                      <Meta
                        className="card__summary"
                        description={list.description}
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
