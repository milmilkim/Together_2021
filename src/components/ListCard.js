import { Col } from 'antd';
import { Link } from 'react-router-dom';
import 'components/ListCard.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Row, Spin } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card } from 'antd';

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
        const sortedRes = res.data.sort((a, b) => b.id - a.id);
        setData(sortedRes.slice(0, 9));
        setItem(sortedRes.slice(9));
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
        <div>
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
            <Row gutter>
              {data.map(list => (
                <Col xs={24} sm={8} md={8}>
                  <Link to="/contents">
                    <Card
                      hoverable
                      style={{ width: '100%' }}
                      cover={<img alt="example" src={list.thumbnail} />}
                    >
                      <Meta
                        title={list.title}
                        description={list.description}
                      />
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </InfiniteScroll>
        </div>
      )}{' '}
    </>
  );
};

export default ListCard;
